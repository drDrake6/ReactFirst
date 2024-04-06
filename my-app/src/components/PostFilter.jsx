import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';
import { v4 as uuidv4 } from 'uuid';

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
        <MyInput 
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value})}
          placeholder="Search..."
        />
        <MySelect
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue={'Sort by'}
          options={[
            {value: 'title', name: 'By name', key: uuidv4()},
            {value: 'body', name: 'By description', key: uuidv4()}
          ]}
        />
      </div>
    );
};

export default PostFilter;