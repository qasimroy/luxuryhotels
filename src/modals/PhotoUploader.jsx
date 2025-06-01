// components/PhotoUploader.js
import { apis, BASEURL } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';
import { useEffect, useRef, useState } from 'react';

const PhotoUploader = ({ closeModal2, images, hotel_logo }) => {
    const [selectedTab, setSelectedTab] = useState('Photos');
    const [selectedImage, setSelectedImage] = useState([]);
    const [currentimages, setcurrentimages] = useState(images ?? []);
    const [logo, setlogo] = useState(hotel_logo);
    const { request, response, loading } = useRequest()
    const input_ref = useRef()
    const [image, setImage] = useState(null);
    const hotel_details = localStorage.getItem("hotel_details") ? JSON.parse(localStorage.getItem("hotel_details")) : null
    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const imageUrl = URL.createObjectURL(file);
    //         setImage(imageUrl);
    //     }
    // };

    const handleTabClick = (tab) => {
        input_ref.current.value = null
        setImage(null)
        setSelectedTab(tab)
    };

    const handleImageUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles) {


            setImage(selectedFiles.map((it) => URL.createObjectURL(it)))
            // setSelectedImage([...selectedImage, imageUrl]);
        }
    };
   console.log("currentimages",currentimages);
    useEffect(() => {
        if (selectedTab) {
            if (selectedTab == "Photos") {
                setSelectedImage(currentimages ? currentimages?.map(filePath => filePath.slice(0, 5) == "https" ? filePath : `${BASEURL}/${filePath}`) : [])
            } else {
                console.log(logo, "logo", hotel_logo)
                let log = logo ? [`${BASEURL}/${logo}`] : []
                setSelectedImage(log)
            }
        }
    }, [selectedTab])
  

    const handleRemoveImage = async (url) => {
        // setSelectedImage(null)
        let payload = {
            hotelId: hotel_details?._id,
            imagePath: url.replace(`${BASEURL}/`, "")
        }
        const res_data = await request("POST", apis.DELETE_HOTEL_IMAGE, payload)
        if (res_data) {
            if (selectedTab == "Photos") {

                setSelectedImage(res_data?.data?.images?.map(filePath => filePath.slice(0, 5) == "https" ? filePath : `${BASEURL}/${filePath}`))
            } else {
                setSelectedImage([`${BASEURL}/${res_data?.data?.hotel_logo}`])
            }
            setcurrentimages(res_data?.data?.images)
            setlogo(res_data?.data?.hotel_logo)
            input_ref.current.value = null
        }
    }

    const handle_image_upload = async () => {
        const formdata = new FormData

        formdata.append('hotelId', hotel_details?._id)
        formdata.append('type', selectedTab == "Photos" ? "images" : selectedTab.toLowerCase())
        let files=Array.from(input_ref.current.files)
        files.map((file) =>{

            formdata.append('images', file)
        })
        let res_data
        if (selectedTab == "Photos") {
            res_data = await request("POST", apis.UPLOAD_HOTEL_IMAGE, formdata)
        }
        else {
            res_data = await request("POST", apis.UPLOAD_HOTEL_LOGO, formdata)
        }
        console.log(res_data, 'res_data', selectedTab)
        if (res_data) {
            if (selectedTab == "Photos") {
                console.log(res_data?.data?.hotel?.images?.map(filePath => `${BASEURL}/${filePath}`), "filePath")
                setSelectedImage(res_data?.data?.hotel?.images?.map(filePath => filePath.slice(0, 5) == "https" ? filePath : `${BASEURL}/${filePath}`))
            } else {
                console.log(res_data?.data, "res_data?.data")
                setSelectedImage([`${BASEURL}/${res_data?.data?.hotel?.hotel_logo}`])
            }
            setImage(null)
            input_ref.current.value = null
        }
    }

    return (
        <div className="modal photo-selectModal fade show" id="exampleModalLive" tabIndex="-1" aria-labelledby="exampleModalLiveLabel" style={{ display: "block" }} aria-modal="true" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content" >
                    <div className="modal-body" >
                        <button type="button"
                            onClick={closeModal2}
                            className="btn-close" >
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 30L30 10M10 10L30 30" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </button>
                        <div style={{ display: 'flex' }}>
                            {/* Left Side Tabs */}
                            <div style={{
                                width: '200px',
                                backgroundColor: 'rgb(237 237 237)',
                                borderRadius: '10px',
                                padding: '15px'
                            }}>
                                <div
                                    onClick={() => handleTabClick('Photos')}
                                    style={{
                                        padding: '14px 20px',
                                        cursor: 'pointer',
                                        backgroundColor: selectedTab === 'Photos' ? '#d32f2f' : 'transparent',
                                        color: selectedTab === 'Photos' ? '#fff' : '#000',
                                    }}
                                >
                                    Photos
                                </div>
                                <div
                                    onClick={() => handleTabClick('Logo')}
                                    style={{
                                        padding: '14px 20px',
                                        cursor: 'pointer',
                                        backgroundColor: selectedTab === 'Logo' ? '#d32f2f' : 'transparent',
                                        color: selectedTab === 'Logo' ? '#fff' : '#000',
                                    }}
                                >
                                    Logo
                                </div>
                            </div>

                            {/* Right Side Content */}
                            <div style={{ flex: 1, padding: '20px', height: '500px', overflow: "auto" }}>
                                <h2 style={{ fontSize: '30px', color: '#d32f2f', marginBottom: '20px' }}>{selectedTab}</h2>
                                <input
                                    ref={input_ref}
                                    type="file"
                                    multiple={selectedTab === 'Logo' ? false : true}
                                    onChange={handleImageUpload}
                                    style={{
                                        display: 'block',
                                        marginBottom: '20px',
                                        border: '1px solid #d32f2f',
                                        padding: '10px',
                                        borderRadius: '5px',
                                    }}
                                />
                                {image && <div className="w-full mt-2 mb-4 border p-2 rounded-lg">
                                    {image ? image?.map((it) => {
                                     return   (
                                            <img key={it}
                                                src={it}
                                                alt="Preview"
                                                style={{ height: "150px", width: "150px" }}
                                                className="w-full h-48 object-contain border p-1 rounded-sm "
                                            />
                                        )
                                    })  : (
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center border p-1 rounded-sm border-primary">
                                        <p>No image selected</p>
                                    </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload">
                                        <button onClick={handle_image_upload} className="theme-btn mt-3">
                                            Upload Image
                                        </button>
                                    </label>
                                </div>}
                                {selectedImage && selectedImage.map((it, i) => (
                                    <div key={i} style={{ position: 'relative', display: 'inline-block', marginRight: '18px' }}>
                                        <img
                                            src={it}
                                            alt="Uploaded"
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                borderRadius: '5px', borderRadius: '5px'
                                            }}
                                        />
                                        <button
                                            onClick={() => handleRemoveImage(it)}
                                            style={{
                                                position: 'absolute',
                                                top: '-10px',
                                                right: '-10px',
                                                backgroundColor: 'rgb(211, 47, 47)',
                                                color: 'rgb(255, 255, 255)',
                                                border: 'none',
                                                borderRadius: '50%',
                                                cursor: 'pointer',
                                                padding: '5px',
                                                height: '24px',
                                                width: '24px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <svg width="25" height="25" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 30L30 10M10 10L30 30" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PhotoUploader;



const ImageUpload = () => {
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    return (
        <div className="w-full mt-2 border-primary border p-2 rounded-lg">
            {image ? (
                <img
                    src={image}
                    alt="Preview"
                    className="w-full h-48 object-contain border p-1 rounded-sm border-primary"
                />
            ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center border p-1 rounded-sm border-primary">
                    <p>No image selected</p>
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="file-upload"
            />
            <label htmlFor="file-upload">
                <button className="btn mt-5 bg-primary text-white text-xl hover:bg-primaryDark w-full">
                    Upload Image
                </button>
            </label>
        </div>
    );
};
