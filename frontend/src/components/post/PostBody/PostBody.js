import React, { Component } from 'react';
import styles from './PostBody.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class PostBody extends Component {
  getMap = () => {
    const { lat, lng, address } = this.props;

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new window.daum.maps.LatLng(lat, lng), // 지도의 중심좌표
        level: 2 // 지도의 확대 레벨
      };

    // 지도를 생성합니다
    var map = new window.daum.maps.Map(mapContainer, mapOption);

    // 스크롤로 확대/축소 막기
    map.setZoomable();

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new window.daum.maps.ZoomControl();
    map.addControl(zoomControl, window.daum.maps.ControlPosition.RIGHT);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new window.daum.maps.services.Geocoder();

    var marker = new window.daum.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
        infowindow = new window.daum.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 장소의 좌표에 대한 주소정보를 표시합니다
    searchDetailAddrFromCoords({lat, lng}, function(result, status) {
        if (status === window.daum.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

            var content = '<div class="bAddr">' + detailAddr + '</div>';

            marker.setPosition(new window.daum.maps.LatLng(lat, lng));
            marker.setMap(map);

            // 인포윈도우에 장소에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }
    });
    // });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.lng, coords.lat, callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
        if (status === window.daum.maps.services.Status.OK) {
            var infoDiv = document.getElementById('centerAddr');

            for(var i = 0; i < result.length; i++) {
                // 행정동의 region_type 값은 'H' 이므로
                if (result[i].region_type === 'H') {
                    // infoDiv.innerHTML = result[i].address_name;
                    infoDiv.innerHTML = address;
                    break;
                }
            }
        }
    }
  }

  componentDidUpdate() {
    this.getMap();
  }

  render() {
    const { contents } = this.props;
    return (
      <div className={cx('post-body')}>
        <div className={cx('contents')}>
          <div className={cx('map_wrap')}>
            <div id="map"></div>
            <div className={cx('hAddr')}>
              <span id="centerAddr"></span>
            </div>
          </div>
          <div className={cx('body')} dangerouslySetInnerHTML={{__html: contents}} />
        </div>
      </div>
    );
  }
}

export default PostBody;
