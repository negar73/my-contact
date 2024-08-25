import loadingImage from "../assets/Loading_2.gif"
const Spinner = () =>{
    return(
        <div className="text-center">
            <img src={loadingImage} style={{width: "20vw"}} alt="" />
        </div>
    )
}
export default Spinner