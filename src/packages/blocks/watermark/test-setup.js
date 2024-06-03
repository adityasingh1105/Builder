// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));


jest.mock("react-native-actionsheet", () => {
    return {
        get: jest.fn(),
        remove: jest.fn(),
    }
});
jest.mock("react-native-image-crop-picker", () => {
    return {
        get: jest.fn(),
        remove: jest.fn(),
    }
});
jest.mock("react-native-fs", () => {
    return {
        exists:jest.fn(),
        get: jest.fn(),
        remove: jest.fn(),
    }
});
jest.mock("react-native-image-picker", () => {
    return {
        get: jest.fn(),
        remove: jest.fn(),
    }
});
jest.mock("react-native-compressor", () => {
    return {
        get: jest.fn(),
        remove: jest.fn(),
    }
});
jest.mock("react-native-view-shot", () => {
    return {
        captureRef:jest.fn(),
        get: jest.fn(),
        remove: jest.fn(),
    }
});
jest.mock("@react-native-community/cameraroll", () => {
    return {
        get: jest.fn(),
        remove: jest.fn(),
        CameraRoll: jest.fn(),
    }
});
jest.mock("react-native-slider-color-picker", () => {
    return {
        get: jest.fn(),
        remove: jest.fn(),
    }
});
jest.mock("react-native-draggable", () => {
    return {
        get: jest.fn(),
        remove: jest.fn(),
    }
});
