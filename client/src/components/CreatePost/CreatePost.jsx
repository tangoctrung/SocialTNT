import React, { useContext, useState } from 'react';
import "./CreatePost.css";
import { Context } from 'context/Context';
import axios from 'axios';
import {storage} from '../../firebase';

function formatTime (date) {
    var hour = new Date(date).getHours(); 
    var minutes = new Date(date).getMinutes(); 
    var seconds = new Date(date).getSeconds();
    var time = hour + "h " + minutes + "m " + seconds + "s ";
    var date1 = new Date(date).toDateString();
    var time2 = time + date1;
    return time2;
}

function CreatePost() {
    const [isOpenCreatePost, setIsOpenCreatePost] = useState(false);
    const PF = "http://localhost:8800/images/";
    const { user} = useContext(Context);
    const [images, setImages] = useState([]);

    const [titlePost, setTitlePost] = useState("");
    const [bodyPost, setBodyPost] = useState("");
    const [hashtag, setHashtag] = useState("");

    const handleUploadImages = (e) => {
        let files = [...e.target.files];
        let newImages = [];
        var date = Date.now();
        var date1 = formatTime(date);
        console.log(date1);
        files.forEach(file => {
            // return newImages.push(file);
            const uploadTask = storage.ref(`imagePost/${user._id},${user.username}/${date1}/${file.name}`).put(file);
            console.log("loading");
            uploadTask.on('state_changed', 
                (snapshot) => {}, 
                (error) => { alert(error)}, 
                () => {
                    // complete function ....
                    storage.ref(`imagePost/${user._id},${user.username}/${date1}`).child(file.name).getDownloadURL().then(url => {
                        console.log(url);
                        newImages.push(url);
                        setImages([...newImages]);
                    })
                });
        });
       
    }

    const handleRemoveImageItem = (index) => {
        let newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    const handleChangeHashtag = (e) => {
        setHashtag(e.target.value);
        
    }
    const handleSubmitCreatePost = async (e) => {
        e.preventDefault();
        console.log(hashtag);
        console.log(hashtag.split(" "));
        let arrayHashtag = "";
        arrayHashtag = hashtag.split(" ");
        let dataPost = {
            userId: user._id,
            title: titlePost,
            body: bodyPost,
        }
        dataPost.hashtags = [...arrayHashtag];
                // let urlImage = [];
                // for(const image of images) {
                //     const data = new FormData();
                //     const filename = Date.now() + image.name;
                //     data.append("name", filename);
                //     data.append("file", image);
                //     urlImage.push(filename);
                //     try {
                //         await axios.post("/upload", data);
                //     } catch (err) {}
                // }
        if (images) {          
            dataPost.images = [...images];  
            console.log(images);        
        }
        console.log(dataPost);
        try{
            await axios.post("/posts", dataPost);
            window.location.replace(`/`);
        } catch(error){
        }

    }


    return (
        <div className="createPost">
            <div className="createPost-info" onClick={()=> setIsOpenCreatePost(true)}>
                <div className="createPost-info-top">
                    <div className="createPost-info-top-image">
                        <img src={user.avatar ? (user.avatar) : (PF + "noAvatar.png")} alt="Hình ảnh"/>
                    </div>
                    <div className="createPost-info-top-input">
                        <div className="input">Hãy cập nhật trạng thái bây giờ của bạn!</div>
                    </div>
                </div>
                <hr />
                <div className="createPost-info-bottom">
                    <div className="createPost-info-bottom-item createPost-info-bottom-image-video">
                        <i className="fas fa-photo-video"></i>
                        <span>Ảnh/Video</span>
                    </div>
                    <div className="createPost-info-bottom-item createPost-info-bottom-camera">
                        <i className="fas fa-camera"></i>
                        <span>Chụp ảnh</span>
                    </div>
                    <div className="createPost-info-bottom-item createPost-info-bottom-emoji">
                        <i className="fas fa-grin-alt"></i>
                        <span>Cảm xúc</span>
                    </div>
                </div>
            </div>
            {isOpenCreatePost && <div className="createPost-content">            
                <div className="createPost-content-container">
                    <div className="createPost-content-close" onClick={()=> setIsOpenCreatePost(false)}>
                        <i className="fas fa-times" ></i>
                    </div>
                    <form className="createPost-content-post" onSubmit={handleSubmitCreatePost}>
                        <div className="createPost-content-image-title">
                            <div className="createPost-content-image">
                                <img src={user.avatar ? (user.avatar) : (PF + "noAvatar.png")} alt="Hình ảnh" />
                            </div>
                            <div className="createPost-content-title">
                                <input type="text" placeholder="Tiêu đề bài viết" onChange={e => setTitlePost(e.target.value)} />
                            </div>
                        </div>
                        <div className="createPost-content-body">
                            <textarea type="text" placeholder="Nội dung bài viết" onChange={e => setBodyPost(e.target.value)} ></textarea>
                        </div>
                        <div className="createPost-content-imageVideo-camera-emoji">
                            <label htmlFor="chooseFile" className="createPost-content-imageVideo createPost-content-item1">
                                <i className="fas fa-photo-video"></i>
                                <span>Ảnh/Video</span>
                                <input type="file" id="chooseFile" name="chooseImagePost" onChange={handleUploadImages} style={{display: "none"}} multiple accept="image/*,video/*"/>
                            </label>
                            <div className="createPost-content-camera createPost-content-item1">
                                <i className="fas fa-camera"></i>
                                <span>Chụp ảnh</span>
                            </div>
                            <div className="createPost-content-emoji createPost-content-item1">
                                <i className="fas fa-grin-alt"></i>
                                <span>Cảm xúc</span>
                            </div>
                        </div>
                        <div className="createPost-content-containerImage">
                            {images && images.map((image, index) =>  
                                {return <div key={index} className="createPost-content-containerImage-imageIcon">
                                            <img src={image} />
                                            <i className="far fa-times-circle" onClick={() => handleRemoveImageItem(index)}></i>
                                        </div>
                                }
                            )}
                   
                        </div>
                        <div className="createPost-content-hashtag-button">
                            <div className="createPost-content-hashtag">
                                <input type="text" placeholder="Hashtag bài viết" onChange={handleChangeHashtag} />
                            </div>
                            <div className="createPost-content-button">
                                <button>POST</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    );
}

export default CreatePost;