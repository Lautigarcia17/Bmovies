import { Spinner } from "react-bootstrap";

function LoadingSpinner() {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "4em",
            }}
        >
            <Spinner animation="border" variant="light" />
        </div>
    )
}

export default LoadingSpinner;