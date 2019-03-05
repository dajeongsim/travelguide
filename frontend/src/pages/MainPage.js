import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import MainWrapper from 'components/main/MainWrapper';
import Map from 'components/main/Map';
import MainBody from 'components/main/MainBody';

const MainPage = () => (
  <PageTemplate>
    <MainWrapper>
      <Map />
      <MainBody />
    </MainWrapper>
  </PageTemplate>
)

export default MainPage;
