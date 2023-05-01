import { useRouter } from "next/router";
import * as React from "react";
import { ChangeEvent, FormEvent, useState } from "react";

const UPLOAD_ENDPOINT = 'http://127.0.0.1:8080/upload_nft/';

type Props = {

}


const NewButton: React.FC<Props> = () => {
    const [file, setFile] = useState<File>();
    const [showUploading, setShowUploading] = useState<string>("d-none");

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const handleUploadFile = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            return;
        }
        document.getElementById("addNewModal")

        // 👇 Uploading the file using the fetch API to the server
        fetch(UPLOAD_ENDPOINT, {
            method: 'POST',
            body: file,
            // 👇 Set headers manually for single file upload
            headers: {
                'content-type': file.type,
                'content-disposition': `attachment; filename="${file.name}"`,
                'content-length': `${file.size}`, // 👈 Headers need to be a string
            },
        })
            .then((res) => res.json())
            .then((data) => {
                document.getElementById("addNewModal").classList.remove("show", "d-block");
                document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("modal-backdrop"));
                setShowUploading("d-none");
            })
            .catch((err) => console.error);

        setShowUploading("");
    }

    return <>
        <button type="button" className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#addNewModal">
            Add new
        </button>

        <div className="modal fade" id="addNewModal" tabIndex={-1} aria-labelledby="addNewModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addNewModalLabel">Add new image</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleUploadFile}>
                            <input
                                className="form-control form-control-md m-2"
                                id="formFileLg"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <button type="submit" className="btn btn-primary float-end">
                                Save changes
                            </button>
                        </form>
                    </div>
                    <p className={`m-3 ${showUploading}`}>Uploading...</p>
                </div>
            </div>
        </div>
    </>
};

export default NewButton;