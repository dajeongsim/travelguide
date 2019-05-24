import React from 'react';
import styles from './Map.scss';
import classNames from 'classnames/bind';
import * as img from 'img';
import $ from 'jquery';

const cx = classNames.bind(styles);

const Map = () => {
  $(document).ready(() => {
    const area = ['seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon', 'ulsan', 'sejong', 'gyeonggi', 'gangwon', 'chungbuk', 'chungnam', 'jeonbuk', 'jeonnam', 'gyeongbuk', 'gyeongnam', 'jeju'];

    for (let i=0; i<area.length; i++) {
      document.getElementById(area[i]).onmouseover = () => {
        document.getElementById('mapImg').setAttribute('src', img['map'+(i+1)]);
      }
      document.getElementById(area[i]).onmouseout = () => {
        document.getElementById('mapImg').setAttribute('src', img.map0);
      }
    }
  });

  return (
    <div className={cx('map')}>
      <img src={img.map0} alt="전국지도" useMap="#areaMap" className={cx('map-img')} id="mapImg" />
      <map name="areaMap" id="areaMap">
        <area shape="poly" href="#" id="seoul" alt="서울" title="서울"  coords="91,122,103,123,103,116,105,114,110,112,110,106,113,104,120,105,123,108,124,119,128,122,130,123,131,128,127,132,127,135,121,142,117,142,114,138,112,140,102,140,100,138,100,135,97,135,97,132,93,128" />
        <area shape="poly" href="#" id="busan" alt="부산" title="부산"  coords="324,401,320,406,322,412,322,418,319,422,310,423,295,434,293,432,289,432,288,438,284,439,280,439,275,433,264,437,262,445,260,447,255,447,252,444,250,440,249,434,254,432,266,422,271,426,277,427,283,425,284,420,284,414,292,410,298,404,302,403,314,391,319,393,322,397" />
        <area shape="poly" href="#" id="daegu" alt="대구" title="대구"  coords="250,323,255,322,255,317,262,313,266,312,272,317,277,322,275,325,278,331,271,337,268,350,261,356,259,352,257,352,254,355,255,361,245,360,238,363,237,357,238,353,243,351,243,348,242,342,244,339,239,335,238,329,242,328,246,322,248,320" />
        <area shape="poly" href="#" id="incheon" alt="인천" title="인천"  coords="69,92,74,97,69,106,73,112,73,117,70,120,75,124,80,120,82,114,84,119,87,118,92,123,93,128,97,134,93,136,94,141,90,145,86,146,84,143,80,143,78,137,76,137,73,141,69,142,67,140,62,146,62,156,67,157,72,161,71,166,68,169,66,170,63,169,56,172,51,182,41,184,37,177,30,180,25,179,22,178,22,175,18,173,18,167,23,162,25,161,29,157,35,158,40,163,42,162,43,158,49,156,56,161,61,157,61,145,58,142,55,141,53,139,53,132,50,130,50,118,43,118,42,115,38,116,36,112,36,105,37,103,42,102,42,95,46,91,51,92,55,91,57,87,60,86,64,91" />
        <area shape="poly" href="#" id="gwangju" alt="광주" title="광주"  coords="103,408,109,415,114,417,113,425,100,436,92,436,88,427,82,427,80,423,80,418,82,415,85,409,90,409,100,411" />
        <area shape="poly" href="#" id="daejeon" alt="대전" title="대전"  coords="153,260,159,259,163,264,162,274,158,277,160,288,153,292,143,289,139,286,137,277,137,269,149,256" />
        <area shape="poly" href="#" id="ulsan" alt="울산" title="울산"  coords="334,355,342,361,341,368,339,373,340,379,334,384,333,396,324,400,322,399,321,394,318,392,318,385,311,385,308,382,303,381,302,378,300,376,296,376,296,370,302,367,301,362,303,359,304,354,306,352,311,351,315,349,319,354,326,358,332,357" />
        <area shape="poly" href="#" id="sejong" alt="세종" title="세종"  coords="135,235,140,234,141,240,147,249,148,256,137,269,132,267,128,263,127,259,131,250,126,249,120,233,124,230" />
        <area shape="poly" href="#" id="gyeonggi" alt="경기" title="경기"  coords="112,42,113,38,119,39,126,38,127,45,130,54,138,54,144,59,149,60,164,81,164,87,160,91,160,96,158,100,159,105,163,111,163,116,171,119,179,119,185,123,186,129,182,136,186,144,181,153,181,172,167,186,152,194,144,205,129,200,119,200,112,201,106,205,100,205,94,200,93,196,88,192,86,187,88,184,86,180,81,179,75,175,76,167,80,165,81,163,82,158,85,154,83,150,87,146,90,145,94,141,95,139,94,136,98,135,102,140,113,140,118,143,122,142,127,136,128,131,132,128,131,121,129,121,128,121,124,117,123,106,118,105,113,103,110,105,109,112,106,113,102,117,102,122,91,121,87,118,84,117,81,113,80,117,73,122,71,121,73,117,73,113,69,108,75,97,82,98,84,89,89,88,89,82,85,80,83,76,86,73,94,73,99,70,99,65,103,64,99,58,92,58,89,55,92,52,98,52,101,50,102,42,107,46" />
        <area shape="poly" href="#" id="gangwon" alt="강원" title="강원"  coords="230,29,230,22,234,19,232,5,234,2,241,4,248,18,248,26,258,43,259,51,272,71,278,84,290,100,300,107,300,112,297,114,304,120,306,127,308,133,324,148,324,156,326,161,326,170,315,182,313,184,303,184,298,182,293,184,289,183,286,186,281,181,274,182,270,186,258,187,255,183,242,174,233,175,234,170,232,171,226,164,219,164,210,169,204,165,204,161,198,164,199,171,194,175,186,176,182,172,182,153,188,146,187,144,182,136,188,131,186,123,179,118,172,118,164,116,163,110,160,105,158,100,161,97,161,91,165,88,166,82,152,60,149,59,144,58,139,54,132,54,127,44,126,37,137,31,142,34,145,39,152,38,158,32,166,31,168,37,207,38,210,33,210,24,212,20,225,20,226,28" />
        <area shape="poly" href="#" id="chungbuk" alt="충북" title="충북"  coords="211,287,210,291,205,292,204,300,200,302,199,305,199,311,183,314,176,310,173,310,170,308,169,301,168,296,167,287,160,286,159,284,157,277,161,274,162,263,158,259,153,258,149,256,147,247,141,241,139,233,143,225,150,224,154,221,144,208,144,204,152,194,160,188,169,185,181,173,186,176,195,177,200,173,199,166,203,161,205,166,210,171,220,165,225,165,229,170,232,175,241,176,253,183,258,188,251,192,245,200,247,205,246,210,245,214,239,216,233,213,229,213,229,210,227,207,223,208,218,216,214,217,210,222,197,230,195,238,191,239,189,242,191,247,194,246,197,256,194,262,193,270,191,272,189,275,192,281,201,282,204,281,207,287" />
        <area shape="poly" href="#" id="chungnam" alt="충남" title="충남"  coords="153,219,151,224,143,224,140,229,139,234,135,234,124,231,120,233,125,247,130,251,127,259,126,261,131,268,137,270,137,278,139,286,144,290,153,293,156,291,161,288,166,288,167,297,169,302,169,308,171,314,164,320,160,319,156,320,147,310,147,305,146,302,134,302,131,308,128,308,126,312,119,312,118,300,112,294,107,294,104,296,104,304,98,307,99,312,88,318,81,315,80,312,76,308,78,305,74,302,66,298,66,293,71,284,70,281,70,275,66,272,65,270,53,269,48,260,46,252,50,251,51,246,45,239,48,234,44,233,40,237,35,237,31,230,34,227,33,222,31,218,52,191,56,189,56,186,59,184,65,184,70,184,74,190,78,189,77,198,79,195,85,196,88,193,93,197,96,203,102,207,107,206,115,201,129,200,143,205,144,210" />
        <area shape="poly" href="#" id="jeonbuk" alt="전북" title="전북"  coords="131,308,135,303,144,303,146,310,155,320,160,320,165,321,172,316,174,312,176,311,181,316,192,314,193,319,195,325,193,330,188,332,186,336,184,339,175,341,172,344,173,350,171,354,170,364,168,365,168,373,169,379,173,385,173,391,169,393,169,399,166,400,163,399,161,395,156,395,151,398,150,403,145,403,141,399,130,399,128,403,121,403,118,400,120,396,115,391,114,388,109,389,99,380,91,384,88,390,87,393,80,396,75,400,68,398,66,393,60,387,57,378,64,374,64,365,63,360,72,353,76,352,75,348,79,344,80,339,78,332,74,326,70,322,68,319,71,316,81,317,88,319,100,313,100,308,105,305,105,297,108,295,113,294,117,301,118,311,123,314,130,314,128,311" />
        <area shape="poly" href="#" id="jeonnam" alt="전남" title="전남"  coords="165,401,166,406,171,406,172,417,174,423,185,436,187,447,186,452,191,458,189,461,191,466,189,469,191,475,188,476,187,480,188,486,185,489,178,490,175,487,163,486,163,494,167,506,162,513,159,514,154,512,155,509,150,506,146,511,143,511,134,518,129,515,127,518,127,527,118,530,115,531,112,528,97,527,93,530,85,530,84,527,78,527,69,528,62,519,56,516,44,522,36,521,35,525,40,531,39,536,32,535,15,547,2,535,16,510,16,504,23,499,22,495,16,493,10,488,14,480,10,475,12,473,9,467,10,464,16,457,17,452,20,445,26,446,30,436,22,432,19,424,22,420,29,422,31,418,35,416,39,421,52,419,47,412,54,400,59,387,67,393,67,399,74,402,79,400,85,409,82,414,79,417,81,427,88,428,92,437,99,438,108,431,114,426,115,415,110,413,104,407,99,409,85,408,79,399,85,394,90,391,90,384,98,382,107,392,108,390,112,388,118,396,119,403,128,405,131,403,132,400,140,400,145,405,150,404,153,401,152,399,156,395,161,397" />
        <area shape="poly" href="#" id="gyeongbuk" alt="경북" title="경북" coords="325,170,328,176,336,186,392,143,399,148,405,143,408,140,423,141,428,144,432,139,433,134,430,131,424,130,423,134,422,136,409,136,408,129,407,126,407,123,403,120,398,122,392,124,389,127,383,127,381,130,385,136,387,142,392,142,335,189,334,196,332,200,335,209,341,214,339,221,338,226,339,232,334,238,336,244,336,258,337,263,333,266,331,288,336,299,337,305,334,310,339,313,344,304,349,304,351,310,351,320,349,323,349,335,344,342,344,347,344,355,339,358,333,354,329,357,317,352,313,349,305,353,303,357,300,361,296,360,291,360,288,364,287,368,284,368,280,372,277,371,272,368,262,368,258,361,255,360,254,355,256,352,261,355,268,351,271,341,272,337,277,334,279,329,276,325,276,322,268,313,263,312,254,317,253,322,251,323,249,321,245,322,239,329,239,335,242,341,243,350,241,352,237,353,237,362,226,362,224,358,224,347,214,336,211,337,198,331,194,330,196,326,197,321,194,318,194,314,200,313,200,307,203,303,206,301,206,295,213,292,213,288,211,286,208,285,208,282,206,280,203,281,194,280,190,274,194,272,195,263,197,258,197,247,192,245,191,243,192,240,196,239,198,232,212,221,219,218,224,210,229,209,231,215,239,218,248,217,247,210,248,205,248,200,251,193,259,188,270,188,274,184,280,183,286,188,290,185,295,186,296,184,302,185,317,185" />
        <area shape="poly" href="#" id="gyeongnam" alt="경남" title="경남" coords="301,378,303,383,308,384,313,386,317,385,317,391,312,391,301,403,297,403,294,407,284,413,283,423,280,426,272,427,267,423,258,428,254,432,249,432,249,441,254,447,261,447,263,441,265,436,274,434,279,439,275,447,274,452,278,460,276,464,270,475,265,479,259,480,255,477,250,477,247,472,243,472,238,467,239,462,237,462,232,464,216,464,214,468,215,478,210,481,209,480,206,477,200,473,198,475,195,474,194,478,192,477,192,472,191,470,194,467,191,462,192,459,188,451,190,448,185,435,175,422,173,419,173,409,171,405,167,404,167,401,171,398,172,393,174,392,175,385,171,378,169,366,172,364,173,354,176,350,175,344,178,341,184,340,188,337,190,333,196,332,201,336,213,338,222,347,222,360,229,363,238,363,245,361,255,361,259,367,264,370,271,368,276,373,281,374,284,371,287,370,291,362,296,361,301,364,299,367,296,370,295,377" />
        <area shape="poly" href="#" id="jeju" alt="제주" title="제주" coords="72,563,75,560,89,560,94,559,100,557,102,562,105,561,108,570,109,578,107,583,103,589,90,600,84,600,79,604,61,602,56,605,54,606,47,607,43,606,39,599,34,596,32,588,35,583,34,580,40,576,45,578,55,565,63,566,67,563" />
      </map>
    </div>
  );
}

export default Map;
