"use client"
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Link from 'next/link'
import { useRouter } from "next/navigation";
import useRequest from "@component/hooks/UseRequest";
import { apis } from "@component/apiendpoints/api";
import { siteContentActions } from "@component/lib/slice/sitesSetting";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import PhotoUploader from "@component/modals/PhotoUploader";
import Select from "react-select";
import debounce from "lodash.debounce";


const Hotel_Info = () => {
    const { register, setError, handleSubmit, getValues, formState: { errors }, reset, setValue, control } = useForm({
        defaultValues: {
            google_photos: ""
        }
    });


    const [fileCount, setFileCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [hotelPhotos, setHotelPhotos] = useState([])

    console.log("hotelPhotos", hotelPhotos)

    const [selectedCountry, setselectedCountry] = useState("")
    const { request, response, } = useRequest()
    const { request: requestSearch } = useRequest()
    const { request: request_create } = useRequest(true);
     const [preview, setPreview] = useState(null);

    const { request: requestfetch, response: responsefetch } = useRequest();
    const { request: requestedit, response: responseedit, loading } = useRequest();

    const router = useRouter()
    const dispatch = useDispatch()
    const hotel_details = localStorage.getItem("hotel_details") ? JSON.parse(localStorage.getItem("hotel_details")) : null
    const [is_edit, setIsEdit] = useState(hotel_details ? true : false)

    const { pass_information, countryData } = useSelector((state) => state.siteSetting)



    const countyOptions = useMemo(() => {
        if (countryData) {
            return countryData?.map((it) => {
                // console.log(it,"it")
                return { value: it?._id, label: it?.country }
            })
        }
    }, [countryData])
    const removeImage = (index) => {
        setHotelPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
    };

    const handleImageChange = (event) => {
        console.log("event", event)
        const file = event.target.files[0];
    
        if (file) {
          const validTypes = ["image/jpeg", "image/jpg", "image/png"];
          console.log("validTypes", validTypes)
          if (!validTypes.includes(file.type)) {
            toast.error("Only JPG, JPEG, and PNG files are allowed.");
            setPreview(null);
            setValue("hotel_logo", null); 
            return;
          }
    
    
          setPreview(URL.createObjectURL(file));
        }
      };



    // Handle form submission

    const meta_fields = ["Meta-Title", "Meta-Description", "Meta-Tags", "Meta-Target-Country", "Meta-Target-Age-Groups"];

    const common_content_fields = ["Hotel Description", "About", "Rooms & Suites", "Restaurant & Bar", "Spa & Wellness"];

    const showModalHandler = () => {
        setShowModal(true);
    };

    const closeModalHandler = () => {
        setShowModal(false);
    };

    function generateMetaContent() {
        const { hotel_name, country, location, meta_description, website, meta_tags, meta_target_age_groups, meta_target_country, meta_title } = getValues()
        const basePrompt = `Act as a Sales Manager to create the following meta information for ${hotel_name} located at ${location} with the website ${website}: Meta-Title: ${meta_title}, Meta-Description:${meta_description} , Meta-Tags:${meta_tags} , Meta-Target-Country: ${meta_target_country || selectedCountry}, Meta-Target-Age-Groups: ${meta_target_age_groups}. The tone should be soft and the writing should be sales-oriented.`;



        // Combine prompt with categories
        const prompt = `${basePrompt}`;

        return prompt;
    }


    function generateContent() {
        const { hotel_name, country, location, website, } = getValues()
        const basePrompt = `Act as a Sales Manager to Write 50 word [Hotel Description], [About], [Rooms & suits], [Restaurant & bar], [Spa & Wellness] - about the ${hotel_name} of ${location} where the website is ${website}. The tone should be soft and writing should be sales oriented.`;



        // Combine prompt with categories
        const prompt = `${basePrompt}`;

        return prompt;
    }

    const content_genrate_with_ai = async (key) => {
        const { hotel_name, country, location, meta_description, website, meta_tags, meta_target_age_groups, meta_target_country, meta_title } = getValues()
        console.log(getValues())
        let res_data
        if (!hotel_name || !country || !location || !website) {
            console.log('enter in condition', country, location)
            return
        }

        if (key == "meta") {

            const prompt = generateMetaContent()
            res_data = await request("POST", apis.GENRATE_HOTEL_CONTENT_WITH_AI, { content: prompt })
            const aiContent = res_data?.response?.choices[0].message.content;

            const structuredData = meta_fields.reduce((acc, category) => {
                const regex = new RegExp(`\\*\\*${category}:\\*\\*\\s*(.*?)(?=\\*\\*|$)`, "gs");
                const match = regex.exec(aiContent);
                acc[category] = match ? match[1].trim() : "Not available";
                return acc;
            }, {});

            // reset({
            //     meta_title: structuredData["Meta-Title"],
            //     meta_description: structuredData["Meta-Description"],
            //     meta_tags: structuredData["Meta-Tags"],
            //     meta_target_country: structuredData["Meta-Target-Country"],
            //     meta_target_age_groups: ["Meta-Target-Age-Groups"]
            // })

            setValue("meta_title", structuredData["Meta-Title"])
            setValue("meta_description", structuredData["Meta-Description"])
            setValue("meta_tags", structuredData["Meta-Tags"])
            setValue("meta_target_country", structuredData["Meta-Target-Country"])
            // setValue("meta_target_age_groups",structuredData["Meta-Target-Age-Groups"])
            setValue("meta_target_age_groups", "25-55")


        } else {

            const prompt = generateContent()
            res_data = await request("POST", apis.GENRATE_HOTEL_CONTENT_WITH_AI, { content: prompt })
            const aiContent = res_data?.response?.choices[0].message.content;

            const structuredData = common_content_fields.reduce((acc, category) => {
                const regex = new RegExp(`\\*\\*${category}:\\*\\*\\s*(.*?)(?=\\*\\*|$)`, "gs");
                const match = regex.exec(aiContent);
                acc[category] = match ? match[1].trim() : "Not available";
                return acc;
            }, {});
            console.log(structuredData["Hotel Description"], "structuredData")
            // reset({
            //     description: structuredData["Hotel Description"],
            //     restaurants_bars: structuredData["Restaurant & Bar"],
            //     rooms_suites: structuredData["Rooms & Suites"],
            //     about: structuredData["About"],
            //     spa_wellness: structuredData["Spa & Wellness"]
            // })

            setValue("description", structuredData["Hotel Description"])
            setValue("restaurants_bars", structuredData["Restaurant & Bar"])
            setValue("rooms_suites", structuredData["Rooms & Suites"])
            setValue("about", structuredData["About"])
            setValue("spa_wellness", structuredData["Spa & Wellness"])
        }
    }

    console.log(hotel_details, 'hotel_details')

    const gethotel_info = sessionStorage.getItem("hotel_info_data")

    useEffect(() => {
        if (gethotel_info && !hotel_details) {
            console.log("wihtout")
            reset({ ...JSON.parse(gethotel_info) })
        }
        else if (hotel_details) {
            requestfetch("GET", `${apis.GETHOTEL_PROFILE}${hotel_details?._id}`)
        }
    }, [gethotel_info])


    const new_fetch_hotel_info = useMemo(() => {

        if (responsefetch && responsefetch?.data) {

            let { meta: {
                meta_title,
                meta_description,
                meta_tags,
                meta_target_country,
                meta_target_age_groups
            }, _id: hotelId,
                hotel_name,
                description,
                location,
                lat,
                long, restaurants_bars,
                spa_wellness, hotel_manager_name,
                hotel_manager_email,
                hotel_manager_telephone, youtube,
                website,
                map_url: mapUrl,
                rooms_suites,
                country, about, additional_information, other_facilities } = responsefetch?.data
            console.log("wihtout")
            reset(
                {
                    meta_title,
                    meta_description,
                    meta_tags,
                    meta_target_country,
                    meta_target_age_groups,
                    hotel_name,
                    description,
                    location,
                    lat,
                    long, restaurants_bars,
                    spa_wellness, hotel_manager_name,
                    hotel_manager_email,
                    hotel_manager_telephone, youtube,
                    website,
                    map_url: mapUrl,
                    rooms_suites,
                    about,
                    additional_information,
                    other_facilities,
                    country: {
                        value: country?._id, label: country?.country
                    }
                }
            )

            return responsefetch?.data


        }

    }, [responsefetch])
    useEffect(() => {
        if (pass_information) {
            const country_find = countryData?.find(
                (item) => item?.country?.toLowerCase() === pass_information?.country?.toLowerCase()
            );
            console.log("pass_information",pass_information)
            setHotelPhotos(pass_information.google_photos.split(','));
            reset({
                ...pass_information, country: {
                    value: country_find?._id, label: country_find?.country
                }
            })
        }
    }, [pass_information])
    console.log(getValues().country, "country")

    const onSubmit = async (data) => {
        // console.log( "data", Array.from(data.images),data.images)
        console.log(data,"DATA"); // Handle the form data as needed
        if (!hotel_details) {

            const imagesArray = hotelPhotos.map((img) => ({
                url: img?.url, 
                filename: img?.name, 
                file: img?.file,
                type: img?.type

            }));
            let google_photos=hotelPhotos.filter((photos) => typeof photos!=="object")

            console.log(imagesArray,"imagesArray")

            const hotelLogoFile = preview?.file || null;
            console.log("hotelLogoFile",getValues().hotel_logo[0]);

            console.log(imagesArray)

            // dispatch(siteContentActions.setFiles({ images: Array.isArray(data.images), hotel_logo: data.hotel_logo[0] }))
            dispatch(siteContentActions.setFiles({ images: Array.from(data.images), hotel_logo: getValues().hotel_logo[0]}));

            console.log(data.images)
            let payload = {
                ...data,
                google_photos:google_photos.join(','),
                images: imagesArray.map((img) => img.file), // Store actual files
                image_filenames: imagesArray.map((img) => img.filename),
                // images: data.images[0] ? URL.createObjectURL(data.images[0]) : "",
                // image_filename: data.images[0] ? data.images[0].name : "",
                hotel_logo_filename: hotelLogoFile ? hotelLogoFile.name : "",
                hotel_logo: hotelLogoFile ? URL.createObjectURL(hotelLogoFile) : "",
                // hotel_logo_filename: data.hotel_logo[0] ? data.hotel_logo[0]?.name : "",
                // hotel_logo: data.hotel_logo[0] ? URL.createObjectURL(data.hotel_logo[0]) : "",
                country: JSON.stringify(data?.country)
            }
            sessionStorage.setItem("hotel_info_data", JSON.stringify(payload))
            dispatch(siteContentActions.setPassInformation(null))
            router.push("/dashboard/facilities-amenities")

        } else {
            const edit_responsne = await requestedit("PUT", `${apis.HOTEL_EDIT}?hotel_id=${hotel_details?._id}`, { ...data, country: data.country.value });
            if (edit_responsne) {
                toast.success(edit_responsne.message)
                router.push("/dashboard/facilities-amenities")
            }
        }

    };

    const { request: requestget_details, response: responseget_details, loading: get_detailsloading } = useRequest(true)

    const handleSearch = useCallback(
        debounce(async (term) => {
            if (term) {

                const res_Data = await requestSearch("POST", apis.FETCH_HOTEL, { hotel: term });
                let { } = res_Data?.response?.predictions
                if (res_Data?.response?.predictions?.length) {

                    const detail_data = await requestget_details("POST", apis.GET_HOTEL_DETAILS, { placeId: res_Data.response.predictions[0]?.place_id });

                    console.log(detail_data?.response?.result?.geometry?.location?.lng, detail_data, "detail_data")
                    reset({
                        lat: detail_data?.response?.result?.geometry?.location?.lat,
                        long: detail_data?.response?.result?.geometry?.location?.lng,
                        map_url: detail_data?.response?.result?.url
                    })

                }

            }
        }, 1000),
        []
    );

    return (
        <div>
            <h3 className='comman-heading3'>
                Please complete all sections with*. The rest of the sections are optional
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Hotel name<span>*</span>
                            </label>
                            <input
                                type="text"
                                // placeholder="Hotel name *"
                                {...register("hotel_name", {
                                    required: "hotel name is required", setValueAs: v => v.trim(), onChange: (e) => {
                                        handleSearch(e.target.value);
                                    }
                                })}

                                className={
                                    errors.hotel_name
                                        ? "form-control"
                                        : "form-control "
                                }
                            />
                            <span className="error_message">
                                {errors["hotel_name"] && `${errors.hotel_name.message}`}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Hotel website
                            </label>
                            <input
                                type="text"
                                // placeholder=" Hotel website Link *"

                                {...register("website", { required: "website is required", setValueAs: v => v.trim() })}
                                className={
                                    errors.website
                                        ? "form-control"
                                        : "form-control "
                                }
                            />
                            <span className="error_message">
                                {errors["website"] && `${errors.website.message}`}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Location <span>*</span>
                            </label>
                            <input
                                type="text"
                                // placeholder="Location *"

                                className={
                                    errors.location
                                        ? "form-control"
                                        : "form-control "
                                }
                                {...register("location", { required: "location is required", setValueAs: v => v.trim() })}
                            />
                            <span className="error_message">
                                {errors["location"] && `${errors.location.message}`}
                            </span>
                        </div>
                    </div>

                    <div className="col-md-6" style={{ marginTop: "10px" }}>
                        <div className="form-group">
                            <label htmlFor="countrySelect" className="form-label">
                                Country <span>*</span>
                            </label>
                            <Controller
                                name="country"
                                control={control}
                                rules={{ required: "Country name is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        classNamePrefix="react-select"
                                        options={countyOptions}
                                        placeholder="Choose a country"
                                        // isSearchable
                                        onChange={(selectedOption) => field.onChange(selectedOption)}
                                    />
                                )}
                            />
                            {errors.country && (

                                <span className="error_message">
                                    {errors.country && errors.country.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Latitude <span>*</span>
                            </label>
                            <input
                                type="text"
                                // placeholder="Latitude *"

                                className={
                                    errors.lat
                                        ? "form-control"
                                        : "form-control "
                                }
                                {...register("lat", { required: "latitude is required" })}
                            />
                            <span className="error_message">
                                {errors["lat"] && `${errors.lat.message}`}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Longitude
                            </label>
                            <input
                                type="text"
                                // placeholder="Longitude *"

                                className={
                                    errors.long
                                        ? "form-control"
                                        : "form-control "
                                }
                                {...register("long", { required: "longitude is required" })}
                            />
                            <span className="error_message">
                                {errors["long"] && `${errors.long.message}`}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Map Url
                            </label>
                            <input
                                type="text"
                                // placeholder="Map Url"

                                className={
                                    errors.map_url
                                        ? "form-control"
                                        : "form-control "
                                }
                                {...register("map_url", { required: "map url is required" })}
                            />
                            <span className="error_message">
                                {errors["map_url"] && `${errors.map_url.message}`}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                YouTube link
                            </label>
                            <input
                                type="text"
                                // placeholder="YouTube link"

                                className={
                                    errors.youtube
                                        ? "form-control"
                                        : "form-control "
                                }
                                {...register("youtube", { required: "youtube is required" })}
                            />
                            <span className="error_message">
                                {errors["youtube"] && `${errors.youtube.message}`}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='desh-borderBox'>
                    <div className='row'>
                        <div className='col-12 text-end'>
                            <a href='' onClick={(e) => {
                                e.preventDefault()
                                content_genrate_with_ai("meta")
                            }} className='theme-btn'>Generate the Meta content with AI</a>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                {/* <label htmlFor="name" className="form-label">
                                    Meta Title
                                </label> */}
                                <input
                                    type="text"
                                    placeholder="Meta Title"

                                    className={
                                        errors.meta_title
                                            ? "form-control"
                                            : "form-control "
                                    }
                                    {...register("meta_title", { required: "meta_title is required" })}
                                />
                                <span className="error_message">
                                    {errors["meta_title"] && `${errors.meta_title.message}`}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                {/* <label htmlFor="name" className="form-label">
                                    Meta Description
                                </label> */}
                                <textarea style={{ height: "auto" }} placeholder='  Meta Description' className={
                                    errors.meta_description
                                        ? "form-control"
                                        : "form-control "
                                } {...register("meta_description", { required: "meta_description is required" })}>

                                </textarea>
                                <span className="error_message">
                                    {errors["meta_description"] && `${errors.meta_description.message}`}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                {/* <label htmlFor="name" className="form-label">
                                    Meta Tags
                                </label> */}
                                <input
                                    type="text"
                                    placeholder=" Meta Tags"

                                    className={
                                        errors.meta_tags
                                            ? "form-control"
                                            : "form-control "
                                    }
                                    {...register("meta_tags", { required: "meta_tags is required" })}
                                />
                                <span className="error_message">
                                    {errors["meta_tags"] && `${errors.meta_tags.message}`}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                {/* <label htmlFor="name" className="form-label">
                                    Target Country
                                </label> */}
                                <input
                                    type="text"
                                    placeholder=" Target Country"

                                    className={
                                        errors.meta_target_country
                                            ? "form-control"
                                            : "form-control "
                                    }
                                    {...register("meta_target_country", { required: "meta_target_country is required" })}
                                />
                                <span className="error_message">
                                    {errors["meta_target_country"] && `${errors.meta_target_country.message}`}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                {/* <label htmlFor="name" className="form-label">
                                    Target Age Groups
                                </label> */}
                                <input
                                    type="text"
                                    placeholder=" Target Age Groups"
                                    className={
                                        errors.meta_target_age_groups
                                            ? "form-control"
                                            : "form-control "
                                    }
                                    {...register("meta_target_age_groups", { required: "meta_target_age_groups is required" })}
                                />
                                <span className="error_message">
                                    {errors["meta_target_age_groups"] && `${errors.meta_target_age_groups.message}`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='desh-borderBox'>
                    <div className='row'>
                        <div className='col-12 text-end'>
                            <a href='' onClick={(e) => {
                                e.preventDefault()
                                content_genrate_with_ai("")
                            }} className='theme-btn'>Generate the content with AI</a>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                {/* <label htmlFor="name" className="form-label">
                                    Hotel Description
                                </label> */}
                                <textarea style={{ height: "auto" }} placeholder='Hotel Description' className={
                                    errors.description
                                        ? "form-control"
                                        : "form-control "
                                }  {...register("description", { required: "description is required" })}>

                                </textarea>
                                <span className="error_message">
                                    {errors["description"] && `${errors.description.message}`}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                {/* <label htmlFor="name" className="form-label">
                                    About
                                </label> */}
                                <textarea style={{ height: "auto" }} placeholder='About' className={
                                    errors.about
                                        ? "form-control"
                                        : "form-control "
                                } {...register("about", { required: "about is required" })}>

                                </textarea>
                                <span className="error_message">
                                    {errors["about"] && `${errors.about.message}`}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                {/* <label htmlFor="name" className="form-label">
                                    Rooms & suits
                                </label> */}
                                <textarea style={{ height: "auto" }} placeholder='Rooms & suits' className={
                                    errors.rooms_suites
                                        ? "form-control"
                                        : "form-control "
                                } {...register("rooms_suites", { required: "rooms_suites is required" })}>

                                </textarea>
                                <span className="error_message">
                                    {errors["rooms_suites"] && `${errors.rooms_suites.message}`}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                {/* <label htmlFor="name" className="form-label">
                                    Restaurant & bar
                                </label> */}
                                <textarea style={{ height: "auto" }} placeholder='Restaurant & bar' className={
                                    errors.restaurants_bars
                                        ? "form-control"
                                        : "form-control "
                                } {...register("restaurants_bars", { required: "restaurants_bars is required" })}>

                                </textarea>
                                <span className="error_message">
                                    {errors["restaurants_bars"] && `${errors.restaurants_bars.message}`}
                                </span>
                            </div>
                        </div>


                        <div className="col-md-12">
                            <div className="form-group">
                                {/* <label htmlFor="name" className="form-label">
                                    Spa & Wellness
                                </label> */}
                                <textarea style={{ height: "auto" }} placeholder='Spa & Wellness' className={
                                    errors.spa_wellness
                                        ? "form-control"
                                        : "form-control "
                                } {...register("spa_wellness", { required: "spa_wellness is required" })}>

                                </textarea>
                                <span className="error_message">
                                    {errors["spa_wellness"] && `${errors.spa_wellness.message}`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Other facilities
                        </label>
                        <input
                            type="text"


                            className={
                                errors.other_facilities
                                    ? "form-control"
                                    : "form-control "
                            }
                            {...register("other_facilities")}
                        />
                    </div>

                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Additional information
                        </label>
                        <input
                            type="text"


                            {...register("additional_information")}
                            className={
                                errors.additional_information
                                    ? "form-control"
                                    : "form-control "
                            }
                        />
                    </div>

                </div>
                <div className='row'>
                    <div className="col-md-6 col-lg-4">
                        {!is_edit ? <div className="form-group">
                            <input className='d-none' multiple type='file' id='upload-img-1' {...register("images", {
                                // required: "hotel Photos is required",
                                onChange: (e) => {
                                    const selectedFiles = Array.from(e.target.files);
                                    setHotelPhotos(prevPhotos => [...prevPhotos, ...selectedFiles]);
                                    const totalFiles = [...selectedFiles];
                                    console.log(totalFiles, "totalFiles")
                                    const unallow_files = totalFiles.filter((file) => {
                                        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
                                            return true
                                        }
                                    })

                                    if (unallow_files.length) {
                                        toast.success("file allowed only jpeg,png and jpg formats")
                                        setValue("images", "")
                                    }

                                    if (totalFiles.length > 15) {
                                        setError("images", "You can only upload a maximum of 15 files.");
                                        toast.success("images", "You can only upload a maximum of 15 files.")
                                    }
                                    setFileCount(totalFiles.length);
                                }
                            })} />
                            <label htmlFor="upload-img-1" className="form-label uploadBox">
                                <div className="flex items-center gap-3">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        viewBox="0 0 256 256"
                                        className="text-xl"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M228,144v64a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V144a12,12,0,0,1,24,0v52H204V144a12,12,0,0,1,24,0ZM96.49,80.49,116,61v83a12,12,0,0,0,24,0V61l19.51,19.52a12,12,0,1,0,17-17l-40-40a12,12,0,0,0-17,0l-40,40a12,12,0,1,0,17,17Z"></path>
                                    </svg>
                                    <p className="uppercase text-grayDark mb-0">Upload Photos</p>
                                </div>
                            </label>
                            <span className="error_message">
                                {errors["images"] && `${errors.images.message}`}
                            </span>
                            <div className='file-number'>
                                {hotelPhotos?.length} {fileCount === 1 ? "File" : "Files"} selected
                            </div>
                            <p className="text-xs uppercase leading-5 text-grayDark mt-1">
                                Attach file. File size of your documents should not exceed 10MB
                            </p>
                            {/* <span className="error_message">
                                {errors["spa_wellness"] && `${errors.spa_wellness.message}`}
                            </span> */}

                        </div> :
                            <div className="form-group">

                                <label onClick={showModalHandler} htmlFor="upload-img-1" className="form-label uploadBox">
                                    <div className="flex items-center gap-3">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 256 256"
                                            className="text-xl"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M228,144v64a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V144a12,12,0,0,1,24,0v52H204V144a12,12,0,0,1,24,0ZM96.49,80.49,116,61v83a12,12,0,0,0,24,0V61l19.51,19.52a12,12,0,1,0,17-17l-40-40a12,12,0,0,0-17,0l-40,40a12,12,0,1,0,17,17Z"></path>
                                        </svg>
                                        <p className="uppercase text-grayDark mb-0">Upload Photos </p>
                                    </div>
                                </label>
                                <div className='file-number'>
                                    {new_fetch_hotel_info?.hotel_logo ? 1 : 0} Files selected
                                </div>
                                <p className="text-xs uppercase leading-5 text-grayDark mt-1">
                                    Attach file. File size of your documents should not exceed 10MB
                                </p>

                            </div>

                        }
                    </div>
                    <div className="col-md-6 col-lg-4">
                        {!is_edit ?
                            <div className="form-group">
                                <input className='d-none' type='file' id='upload-img-2' {...register("hotel_logo", 
                                { 
                                    // required: "hotel logo is required" 
                                 onChange:(e)=>handleImageChange(e) })}
                                    accept="image/jpeg, image/jpg, image/png"
                                />
                                <label htmlFor="upload-img-2" className="form-label uploadBox">
                                    <div className="flex items-center gap-3">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 256 256"
                                            className="text-xl"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M228,144v64a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V144a12,12,0,0,1,24,0v52H204V144a12,12,0,0,1,24,0ZM96.49,80.49,116,61v83a12,12,0,0,0,24,0V61l19.51,19.52a12,12,0,1,0,17-17l-40-40a12,12,0,0,0-17,0l-40,40a12,12,0,1,0,17,17Z"></path>
                                        </svg>
                                        <p className="uppercase text-grayDark mb-0">Upload Logo</p>
                                    </div>
                                </label>
                                <span className="error_message">
                                    {errors["hotel_logo"] && `${errors.hotel_logo.message}`}
                                </span>
                                <div className='file-number'>
                                   {preview ? "1" : "0"} Files selected
                                </div>
                                <p className="text-xs uppercase leading-5 text-grayDark mt-1">
                                    Attach file. File size of your documents should not exceed 10MB
                                </p>

                            </div>
                            :
                            <div className="form-group">
                                <label onClick={showModalHandler} htmlFor="upload-img-2" className="form-label uploadBox">
                                    <div className="flex items-center gap-3">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 256 256"
                                            className="text-xl"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M228,144v64a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V144a12,12,0,0,1,24,0v52H204V144a12,12,0,0,1,24,0ZM96.49,80.49,116,61v83a12,12,0,0,0,24,0V61l19.51,19.52a12,12,0,1,0,17-17l-40-40a12,12,0,0,0-17,0l-40,40a12,12,0,1,0,17,17Z"></path>
                                        </svg>
                                        <p className="uppercase text-grayDark mb-0">Upload Photos</p>
                                    </div>
                                </label>
                                <div className='file-number'>
                                    {new_fetch_hotel_info?.images?.length} Files selected
                                </div>
                                <p className="text-xs uppercase leading-5 text-grayDark mt-1">
                                    Attach file. File size of your documents should not exceed 10MB
                                </p>

                            </div>
                        }
                    </div>

                    {!is_edit && (hotelPhotos?.length || preview) && (
                        <>
                    <div className="col-md-12 flex justify-between">
                        {hotelPhotos?.length && (

                        <div className="col-md-6">
                            <label className="form-label">Hotel Photos</label>
                            <div className="relative mt-2">
                                {hotelPhotos?.length > 0 ? (
                                    hotelPhotos.map((file, index) => (
                                        <div key={index} className="relative inline-block mr-2">
                                            <img
                                                src={typeof file=="object"? URL.createObjectURL(file):file} 
                                                alt="Selected"
                                                className="w-32 h-32 object-cover rounded-md shadow-md"
                                            />
                                            <button
                                                type="button"

                                                onClick={() => removeImage(index)}
                                                // setValue("file", null);

                                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p>No photos available</p>
                                )}
                            </div>
                        </div>
                        )}
                   
                        {preview && (

                        <div className="col-md-6">
                            <label className="form-label">Hotel Logo</label>
                        <div className="relative mt-2">
                        <img src={preview} alt="Selected" className="w-32 h-32 object-cover rounded-md shadow-md" />
                        <button
                          type="button"
                          onClick={(e) => {
                            setPreview(null)
                            // setValue("file", null)
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md"
                        >
                          ✕
                        </button>
                      </div>
                      </div>
                        )}
                    </div>
                        </>
                   
                )}



                    <div className='footer-btn text-end'>
                        <Link href="/dashboard" className='next-btn'>  Previous </Link>
                        <button type='submit' disabled={loading} className='save-btn'> Continue </button>
                    </div>
                </div>

            </form>
            {showModal &&
                <PhotoUploader images={new_fetch_hotel_info?.images} hotel_logo={new_fetch_hotel_info?.hotel_logo} closeModal2={closeModalHandler} />}

        </div>
    );
};

export default Hotel_Info;