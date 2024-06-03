// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock(
  "react-native-file-viewer",
  () => {
    const FileViwer = {
      open: jest.fn(() => Promise.resolve(true)),
    };
    return FileViwer;
  },
  { virtual: true },
);

jest.mock("react-native-fs", () => {
  return {
    downloadFile: jest.fn(),
    exists: jest.fn(() => Promise.resolve(true)),
    mkdir: jest.fn(() => Promise.resolve(true)),
  };
});
