import {expect, test} from '@jest/globals'
import path from 'path'
import {resolveOutputPath} from '../src/output-path'

test('resolves default output under docs', () => {
  expect(
    resolveOutputPath({
      destPath: 'docs',
      folderName: 'test-post',
      extension: '.md',
      useCustomPath: false,
      customPath: undefined
    })
  ).toBe(path.resolve('docs/test-post/index.md'))
})

test('allows nested output under docs', () => {
  expect(
    resolveOutputPath({
      destPath: 'docs/posts',
      folderName: 'test-post',
      extension: '.md',
      useCustomPath: false,
      customPath: undefined
    })
  ).toBe(path.resolve('docs/posts/test-post/index.md'))
})

test('allows custom output under docs', () => {
  expect(
    resolveOutputPath({
      destPath: 'docs',
      folderName: 'ignored',
      extension: '.md',
      useCustomPath: true,
      customPath: 'docs/custom/post.md'
    })
  ).toBe(path.resolve('docs/custom/post.md'))
})

test('rejects output outside docs', () => {
  expect(() =>
    resolveOutputPath({
      destPath: 'content',
      folderName: 'test-post',
      extension: '.md',
      useCustomPath: false,
      customPath: undefined
    })
  ).toThrow('Output path must stay within docs/.')
})

test('rejects path traversal outside docs', () => {
  expect(() =>
    resolveOutputPath({
      destPath: 'docs',
      folderName: '../test-post',
      extension: '.md',
      useCustomPath: false,
      customPath: undefined
    })
  ).toThrow('Output path must stay within docs/.')
})

test('rejects custom output outside docs', () => {
  expect(() =>
    resolveOutputPath({
      destPath: 'docs',
      folderName: 'ignored',
      extension: '.md',
      useCustomPath: true,
      customPath: 'content/post.md'
    })
  ).toThrow('Output path must stay within docs/.')
})
