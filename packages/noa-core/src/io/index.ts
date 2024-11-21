import type { AxiosError, AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import type { Socket } from 'socket.io-client'
import axios from 'axios'
import SocketClient from 'socket.io-client'

type SocketReturnType = ReturnType<Socket['on']>

export interface PageIO {
  on: <T>(event: string, callback: (data: T) => void) => SocketReturnType
  off: <T>(event: string, callback: (data: T) => void) => SocketReturnType
  send: (event: string, data: unknown) => SocketReturnType
  request: <T = any>(config: AxiosRequestConfig) => Promise<T>
}

type ErrorHandler = (err: AxiosError) => unknown

export class IOClient implements PageIO {
  private socket!: Socket

  isConnected = false

  eventQueue = []

  axios!: AxiosInstance

  errorHandler = new Set<ErrorHandler>()

  constructor(config: CreateAxiosDefaults & {
    socketPath: string
  }) {
    this.axios = axios.create(config)

    this.axios.interceptors.response.use(({ data }) => data)

    this.socket = SocketClient('/', {
      path: config.socketPath,
      transports: ['polling', 'websocket', 'webtransport'],
    })
    this.initEvents()
  }

  send(event: string, data: unknown) {
    return this.socket.send({
      event,
      data,
    })
  }

  on<T>(event: string, callback: (data: T) => void) {
    return this.socket.on(event, callback)
  }

  off<T>(event: string, callback: (data: T) => void) {
    return this.socket.off(event, callback)
  }

  get memberId() {
    return this.socket.id
  }

  initEvents() {
    this.socket.on('connect', () => {
      this.isConnected = true
    })

    // 连接出错
    this.socket.on('connect_error', (error) => {
      console.error('Socket连接失败', error)
      this.isConnected = false
    })

    // 断线
    this.socket.on('disconnect', (msg) => {
      console.error('Socket断开连接', msg)
      this.isConnected = false
    })
  }

  connect() {
    this.socket.connect()
  }

  disconnect() {
    this.socket.disconnect()
  }

  addErrorHandler(handler: ErrorHandler) {
    this.errorHandler.add(handler)
  }

  removeErrorHandler(handler: ErrorHandler) {
    this.errorHandler.delete(handler)
  }

  request<T = any>(config: AxiosRequestConfig) {
    return this.axios.request(config).catch((e: AxiosError) => {
      this.errorHandler.forEach(fn => fn(e))
      throw e
    }) as unknown as Promise<T>
  }
}
