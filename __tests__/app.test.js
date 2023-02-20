/* eslint-disable no-undef */
import app from '../src/app'
import request from 'supertest'

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(404)
  })
})

describe('Test movies path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/movies')
    expect(response.statusCode).toBe(200)
  })
})

describe('Test directors path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/directors')
    expect(response.statusCode).toBe(200)
  })
})

describe('Test genres path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/genres')
    expect(response.statusCode).toBe(200)
  })
})

describe('Test actors path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/actors')
    expect(response.statusCode).toBe(200)
  })
})
