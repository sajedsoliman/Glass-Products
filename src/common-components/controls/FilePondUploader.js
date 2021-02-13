// filepond
import { FilePond, registerPlugin } from "react-filepond"
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';


registerPlugin(FilePondPluginFileEncode, FilePondPluginFileValidateType, FilePondPluginImagePreview);
const mimiTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];


export default function FilePondUploader(props) {
    const { needEncode = true, needMulti = false, imgRreviewMinHeight = 10, imgRreviewMaxHeight = 256, filepondRef, onAddFileHandler, wrapperClassName } = props

    return (
        <div className={wrapperClassName}>
            <FilePond
                ref={filepondRef}
                imagePreviewMinHeight={imgRreviewMinHeight}
                imagePreviewMaxHeight={imgRreviewMaxHeight}
                allowFileEncode={needEncode}
                allowMultiple={needMulti}
                acceptedFileTypes={mimiTypes}
                credits={{ label: "dasdsads" }}
                onaddfile={onAddFileHandler}
            />
        </div>
    )
}
