import { defineStore } from 'pinia'

export const useNewsStore = defineStore('news', {
  state: () => {
    return {
      newsType: [
        {
          id: 1,
          name: '音乐',
        },
        {
          id: 2,
          name: '美术',
        },
        {
          id: 3,
          name: '科技',
        },
        {
          id: 4,
          name: '雕塑',
        },
        {
          id: 5,
          name: '设计',
        },
        {
          id: 6,
          name: '摄影',
        },
      ],
      hotNewsType: [
        {
          id: 1,
          name: '音乐',
        },
        {
          id: 2,
          name: '美术',
        },
        {
          id: 3,
          name: '科技',
        },
        {
          id: 4,
          name: '雕塑',
        },
        {
          id: 5,
          name: '设计',
        },
        {
          id: 6,
          name: '摄影',
        },
      ],
    }
  },
})
