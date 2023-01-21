import React from "react";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { TabContext, TabList } from "@mui/lab";

import { CommentsBlock, Post, TagsBlock } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import byField from "../utils/sortArrsUtil";

export const Home = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data);
    const { posts, tags } = useSelector(state => state.posts);

    const isPostsLoading = posts.status === 'loading';
    const isTagsLoading = tags.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
    }, []);

    const sortPostsByDate = [...posts.items].sort(byField('updatedAt')).reverse();
    const sortPostByViews = [...posts.items].sort(byField('viewsCount')).reverse();

  // Tabs
  const [value, setValue] = React.useState('New');
  const sortedPosts = (value === "New" ? sortPostsByDate : sortPostByViews)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid md={8} sm={12} item>
          <TabContext value={value}>
              <TabList style={{ marginBottom: 15 }} onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="New" value="New" />
                <Tab label="Popular" value="Popular" />
              </TabList>
          </TabContext>
          {(isPostsLoading ? [...Array(5)] : sortedPosts).map((obj, index) => isPostsLoading ?
          <Post key={index} isLoading={true} />
          :
              (
                  <Post
                      id={obj._id}
                      title={obj.title}
                      imageUrl={obj.imageUrl ? obj.imageUrl : ''}
                      user={obj.user}
                      createdAt={obj.createdAt}
                      viewsCount={obj.viewsCount}
                      commentsCount={3}
                      tags={obj.tags}
                      isEditable={userData?._id === obj.user._id}
                  />
              ))}
        </Grid>
        <Grid md={4} sm={0} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Real Person',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'This is a test comment 555555',
              },
              {
                user: {
                  fullName: 'Actual Man',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
