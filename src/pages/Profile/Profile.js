import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/Posts/Post/Post";
import "./Profile.css";

const Profile = () => {
  const { profileID } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3002/profile/${profileID}`
        );
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [profileID]);

  if (loading) {
    return <h4>Loading....</h4>;
  }
  return (
    !loading && (
      <div className="profile_container">
        <div className="profile_card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3537/3537838.png"
            alt=""
          />
          <div className="user_description">
            <h3>{data.userProfile[0].userName}</h3>
            <p>sunnydec2696@gmail.com</p>
          </div>
        </div>
        <div className="posts">
          {data.posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    )
  );
};

export default Profile;
