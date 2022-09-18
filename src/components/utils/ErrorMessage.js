export default function ErrorMessage(props){
    return(
    <div className={"alert alert-"+props.color} role="alert">
        { props.message }
    </div>
    );
}