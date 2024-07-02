import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const ForumPost = ({ author, time, title, description, tags }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.authorInfo}>
        <Image source={require('../assets/man.png')} style={styles.avatar} />
        <View>
          <Text style={styles.authorName}>{author}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>{tag}</Text>
        ))}
      </View>
    </View>
  );
};

const App = () => {
  const [posts, setPosts] = useState([
    {
      author: 'Norma Andrews',
      time: '30 minutes ago',
      title: 'How to Foster Community Engagement',
      description: 'Discussing strategies and practices for fostering meaningful community engagement in local neighborhoods.',
      tags: ['community', 'engagement', 'local'],
    },
    {
      author: 'Olive Francis',
      time: '4 hours ago',
      title: 'Volunteer Opportunities in Your Area',
      description: 'A comprehensive guide to finding and participating in volunteer opportunities that benefit the community.',
      tags: ['volunteer', 'community service', 'opportunities'],
    },
    {
      author: 'Sam Taylor',
      time: '1 day ago',
      title: 'Hosting Successful Community Events',
      description: 'Tips and tricks for organizing and hosting successful community events that encourage participation and interaction.',
      tags: ['events', 'community', 'hosting'],
    },
    {
      author: 'Alex Johnson',
      time: '2 days ago',
      title: 'Building a Stronger Community Through Collaboration',
      description: 'Exploring ways to build stronger communities by encouraging collaboration and cooperation among members.',
      tags: ['collaboration', 'community', 'strength'],
    },
    {
      author: 'Jamie Lee',
      time: '3 days ago',
      title: 'Creating Inclusive Community Spaces',
      description: 'Ideas and practices for creating community spaces that are inclusive and welcoming to everyone.',
      tags: ['inclusion', 'spaces', 'community'],
    },
    {
      author: 'Morgan Brown',
      time: '4 days ago',
      title: 'The Role of Social Media in Community Engagement',
      description: 'Analyzing the impact of social media on community engagement and how to leverage it effectively.',
      tags: ['social media', 'engagement', 'impact'],
    },
    {
      author: 'Taylor Green',
      time: '5 days ago',
      title: 'Community Building Through Arts and Culture',
      description: 'The importance of arts and culture in community building and how to promote it in local neighborhoods.',
      tags: ['arts', 'culture', 'community'],
    },
    {
      author: 'Jordan White',
      time: '6 days ago',
      title: 'Supporting Local Businesses to Strengthen Community Ties',
      description: 'Ways to support local businesses and the positive impact it has on strengthening community ties.',
      tags: ['local businesses', 'support', 'community'],
    },
    {
      author: 'Casey Black',
      time: '1 week ago',
      title: 'Environmental Initiatives for Community Improvement',
      description: 'Environmental initiatives and projects that can help improve the local community and promote sustainability.',
      tags: ['environment', 'initiatives', 'sustainability'],
    },
    {
      author: 'Riley Gray',
      time: '1 week ago',
      title: 'Youth Engagement in Community Development',
      description: 'The importance of involving youth in community development and strategies to encourage their participation.',
      tags: ['youth', 'engagement', 'development'],
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Forum</Text>
        <TouchableOpacity style={styles.newPostButton}>
          <Text style={styles.newPostButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Newest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Featured</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>All posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Unanswered</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.postsContainer}>
        {posts.map((post, index) => (
          <ForumPost key={index} {...post} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  newPostButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 50,
  },
  newPostButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    padding: 8,
  },
  tabText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postsContainer: {
    flex: 1,
    padding: 16,
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 16,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    color: '#777',
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    color: '#555',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#eee',
    padding: 4,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 4,
    fontSize: 12,
    color: '#333',
  },
});

export default App;
