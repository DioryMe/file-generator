const mockFsStatSyncFn = jest.fn().mockReturnValue({})
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  statSync: mockFsStatSyncFn,
}))

export const mockFsStatSync = (birthtime: string, mtime: string) => {
  mockFsStatSyncFn.mockReturnValue({
    birthtime: new Date(birthtime),
    mtime: new Date(mtime),
  })
}
