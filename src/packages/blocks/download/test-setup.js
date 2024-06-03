// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "android",
  select: () => null,
}));
jest.mock("react-native-fs", () => {
  return {
    downloadFile: jest.fn(),
    stopDownload: jest.fn(),
    exists: jest.fn(() => Promise.resolve(true)),
    mkdir: jest.fn(() => Promise.resolve(true)),
    DocumentDirectoryPath: "ssd",
    DownloadDirectoryPath: "ssd",
  };
});
jest.mock("react-native//Libraries/PermissionsAndroid/PermissionsAndroid", () => {
  const PermissionsAndroid = jest.requireActual("react-native//Libraries/PermissionsAndroid/PermissionsAndroid");
  return {
    ...PermissionsAndroid,
    check: jest.fn(() => new Promise((resolve) => resolve(false))),
    request: jest.fn(() => "granted"),
  };
});
