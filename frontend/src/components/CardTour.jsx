import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBIcon, MDBTooltip } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { likeTour } from '../redux/features/tourSlice';
const CardTour = ({ imageFile, description, title, tags, _id, name, likes }) => {

    const { user } = useSelector((state) => ({ ...state.auth }));
    const userId = user?.result?._id;

    const dispatch = useDispatch();
    const excerpt = (str) => {
        if (str.length > 50) {
            str = str.substring(0, 50) + " ...";
        }
        return str;
    };

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId) ? (
                <>
                    <MDBIcon fas icon="thumbs-up" />
                    &nbsp;
                    {likes.length > 2 ? (
                        <MDBTooltip
                            tag="a"
                            title={`You and ${likes.length - 1} other people likes`}
                        >
                            {likes.length} Likes
                        </MDBTooltip>
                    ) : (
                        `${likes.length} Like${likes.length > 1 ? "s" : ""}`
                    )}
                </>
            ) : (
                <>
                    <MDBIcon far icon="thumbs-up" />
                    &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
                </>
            );
        }
        return (
            <>
                <MDBIcon far icon="thumbs-up" />
                &nbsp;Like
            </>
        );
    };

    const handleLike = () => {
        dispatch(likeTour({ _id }));
    };


    return (
        <MDBCardGroup>
            <MDBCard className="h-80 mt-1 d-sm-flex" style={{ maxWidth: "20rem", height: "25rem" }}>
                <MDBCardImage
                    src={imageFile}
                    alt={title}
                    position='top'
                    style={{ maxWidth: "100%", height: "100%" }}
                />
                {/* <div className="top-left">{name}</div> */}
                <span className="text-start tag-card">
                    {tags.map((tag) => (
                        <Link to={`/tours/tag/${tag}`}> #{tag}</Link>
                    ))}
                    <MDBBtn
                        style={{ float: "right" }}
                        tag="a"
                        color="none"
                        onClick={!user?.result ? null : handleLike}
                    >
                        {!user?.result ? (
                            <MDBTooltip title="Please login to like tour" tag="a">
                                <Likes />
                            </MDBTooltip>
                        ) : (
                            <Likes />
                        )}
                    </MDBBtn>
                </span>
                <MDBCardBody>
                    <MDBCardTitle className='text-start' style={{ fontFamily: "lora" , fontWeight:"bold"}}>{title}</MDBCardTitle>
                    <MDBCardText className='text-start' style={{fontFamily: "Josefin", fontSize:"20px" }}>{excerpt(description)}
                        <Link to={`/tour/${_id}`} > Read more</Link>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    )
}

export default CardTour
