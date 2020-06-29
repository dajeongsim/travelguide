import React, { Component } from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'summernote/dist/summernote-bs4.js';
// import 'summernote/dist/lang/summernote-ko-KR.js';
import 'summernote/dist/summernote-bs4.css';

const cx = classNames.bind(styles);

class EditorPane extends Component {
  getMap = (first) => {
    const { onChangeInput } = this.props;

    // 마커를 담을 배열입니다
    var markers = [];

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new window.daum.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

    // 지도를 생성합니다
    var map = new window.daum.maps.Map(mapContainer, mapOption);

    // 스크롤로 확대/축소 막기
    map.setZoomable();

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new window.daum.maps.ZoomControl();
    map.addControl(zoomControl, window.daum.maps.ControlPosition.RIGHT);

    // 장소 검색 객체를 생성합니다
    var ps = new window.daum.maps.services.Places();

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    var infowindow = new window.daum.maps.InfoWindow({zIndex:1});

    // 키워드로 장소를 검색합니다
    (first === 't') || searchPlaces();

    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces() {

        var keyword = document.getElementById('keyword').value;

        if (!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch( keyword, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
        if (status === window.daum.maps.services.Status.OK) {

            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);

            // 페이지 번호를 표출합니다
            displayPagination(pagination);

        } else if (status === window.daum.maps.services.Status.ZERO_RESULT) {

            alert('검색 결과가 존재하지 않습니다.');
            return;

        } else if (status === window.daum.maps.services.Status.ERROR) {

            alert('검색 결과 중 오류가 발생했습니다.');
            return;

        }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
        var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new window.daum.maps.LatLngBounds();
        // ,listStr = '';

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for ( var i=0; i<places.length; i++ ) {

            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new window.daum.maps.LatLng(places[i].y, places[i].x),
                marker = addMarker(placePosition, i),
                itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
                // console.log(`x:${places[i].x}, y:${places[i].y}`);

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다
            // + click 했을 때 address에 값 등록
            (function(marker, title, address, places) {
                window.daum.maps.event.addListener(marker, 'mouseover', function() {
                    displayInfowindow(marker, title);
                });

                window.daum.maps.event.addListener(marker, 'mouseout', function() {
                    infowindow.close();
                });

                window.daum.maps.event.addListener(marker, 'click', function() {
                    // insertPlace(marker, title, address);
                    insertPlace(title, address, places.y, places.x);
                })

                itemEl.onmouseover =  function () {
                    displayInfowindow(marker, title);
                };

                itemEl.onmouseout =  function () {
                    infowindow.close();
                };

                itemEl.onclick = function () {
                    insertPlace(title, address, places.y, places.x);
                }
            })(marker, places[i].place_name, places[i].road_address_name || places[i].address_name, places[i]);

            fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {

        var el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                    '<div class="info">' +
                    '   <h5>' + places.place_name + '</h5>';

        if (places.road_address_name) {
            itemStr += '    <span>' + places.road_address_name + '</span>' +
                        '   <span class="jibun gray">' +  places.address_name  + '</span>';
        } else {
            itemStr += '    <span>' +  places.address_name  + '</span>';
        }

          itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                    '</div>';

        el.innerHTML = itemStr;
        el.className = 'item';

        return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
        var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new window.daum.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions =  {
                spriteSize : new window.daum.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin : new window.daum.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new window.daum.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new window.daum.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new window.daum.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage
            });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
        for ( var i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }
        markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination) {
        var paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i;

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild (paginationEl.lastChild);
        }

        for (i=1; i<=pagination.last; i++) {
            var el = document.createElement('a');
            el.href = "#";
            el.innerHTML = i;

            if (i===pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = (function(i) {
                    return function() {
                        pagination.gotoPage(i);
                    }
                })(i);
            }

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title) {
        var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

        infowindow.setContent(content);
        infowindow.open(map, marker);
    }

    // 선택한 마커의 장소를 address에 입력
    function insertPlace(title, address, lat, lng, func) {
        console.log(`${lat}, ${lng}`);
        document.getElementById('address').value = address + `, ${title}`;
        // document.getElementById('address').click();
        onChangeInput({name: 'address', value: address + `, ${title}`})
        onChangeInput({name: 'coords', value: {latitude: lat, longitude: lng}});

    }

     // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
            el.removeChild (el.lastChild);
        }
    }
  }

  handleChange = (e) => {
    const { onChangeInput } = this.props;
    const { name, value } = e.target;
    onChangeInput({name, value});
  }

  handleChangeContents = () => {
    const { onChangeInput } = this.props;
    const contents = $('#summernote').summernote('code');
    onChangeInput({name: 'contents', value: contents});
  }

  replaceBlank = (e) => {
    const tags = e.target.value.replace(/\s/g, '#').replace(/#+#/, '#');
    e.target.value = tags;
  }

  handleFocus = (e) => {
    const { value } = e.target;

    (value) ? e.target.value = value + '#' : e.target.value = '#';
  }

  handleBlur = (e) => {
    const { value } = e.target;

    (value.charAt(0) !== '#') && (e.target.value = '#' + value);

    if (value === '#') {
      e.target.value = '';
    } else if (value.charAt(value.length-1) === '#') {
      e.target.value = value.substring(0, value.length-1);
    }
  }

  handleSelect = () => {
    const { getCategoryList } = this.props;
    const id = document.getElementById('category0').options[document.getElementById('category0').selectedIndex].value;

    getCategoryList(id);
  }

  componentDidMount() {
    const { handleChangeContents } = this;
    $(document).ready(function(){
      $('#summernote').summernote({
        placeholder: '내용을 입력하세요.',
        tabsize: 2,
        height: 500,
        lang : 'ko-KR',
        callbacks: {
          onChange: function(){
            handleChangeContents();
          }
        }
      });
    });
    this.getMap('t');
  }

  render() {
    const { handleChange, replaceBlank, handleFocus, handleBlur, handleSelect } = this;
    const { onGoBack, onSubmit } = this.props;
    const { title, address, tags, provs, provs2 } = this.props;

    const category0 = provs.toJS().map(prov => <option key={prov.categoryId} value={prov.categoryId}>{prov.categoryName.substring(0,2)}</option>);
    const category = provs2.toJS().map(prov => <option key={prov.categoryId} value={prov.categoryId}>{prov.categoryName}</option>);

    return (
      <div className={cx('editor-pane')}>
        <div className={cx('select-category')}>
          <select name='category0' id='category0' onChange={handleSelect}>
            {category0}
          </select>
          <select name='category' onChange={handleChange}>
            {category}
          </select>
        </div>
        <input className={cx('title')}
               type='text'
               placeholder='제목'
               name="title"
               value={title}
               onChange={handleChange} />
        <div className={cx('map_wrap')}>
          <div id="map"></div>
          <div id="menu_wrap" className={cx('bg_white')}>
            <div className={cx('option')}>
              <div>
                <form onSubmit={this.getMap}>
                    키워드 : <input type="text" id="keyword" size="15"/>
                    <button type="submit">검색하기</button>
                </form>
              </div>
            </div>
            <hr />
            <ul id="placesList"></ul>
            <div id="pagination"></div>
          </div>
        </div>
        <input className={cx('address')}
               id='address'
               type='text'
               placeholder='장소를 선택해주세요.'
               name="address"
               // onClick={handleChange}
               value={address}
               readOnly />
        <div id="summernote"></div>
        <input className={cx('tags')}
               type='text'
               placeholder='#태그를 공백없이 입력해주세요 ex)#태그는#이렇게'
               name="tags"
               onKeyUp={replaceBlank}
               onChange={handleChange}
               onFocus={handleFocus}
               onBlur={(e)=>{
                 handleBlur(e);
                 handleChange(e); }}
               value={tags} />
        <div className={cx('btn')}>
          <Button onClick={onGoBack}>목록으로</Button>
          <Button onClick={onSubmit}>작성하기</Button>
        </div>
      </div>
    );
  }
}

export default EditorPane;
