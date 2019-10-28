import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ListWrapper from 'components/list/ListWrapper';
import Category from 'components/list/Category';
import ListContainer from 'containers/list/ListContainer';

const ListPage = ({match}) => {
  // const { category, tag, page = 1 } = match.params;
  const { category, page = 1 } = match.params;
  return (
    <div>
      <PageTemplate list>
        <ListWrapper
          category={<Category />}
          list={<ListContainer category={category} page={parseInt(page, 10)} />}
        />
        {/*list={<ListContainer category={category} tag={tag} page={parseInt(page, 10)} />}*/}
      </PageTemplate>
    </div>
  );
}

export default ListPage;
