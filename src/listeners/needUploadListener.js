import store from "../redux/store";
import { uploadChapters } from '../redux/slices/chapters';

let currentValue = store.getState().chapters.present.needUpload;
function needUploadListener() {
  let prevousValue = currentValue;
  currentValue = store.getState().chapters.present.needUpload;
  if ((prevousValue !== currentValue) && currentValue === true) {
    store.dispatch(uploadChapters(store.getState().chapters.present.entries))
  }
}

export default needUploadListener;
