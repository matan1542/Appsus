export const Iframe = ({ source }) => {

    if (!source) {
        return <div>Loading...</div>;
    }

    const src = source;     
    return (
        // basic bootstrap classes. you can change with yours.
        <div className="col-md-12">
            <div className="emdeb-responsive">
                <iframe style={{width: "100%"}} src={`http://www.google.com/maps/embed/v1/place?key=AIzaSyChfnf_nR2vBdt8aP4tRoPnwMSuYzriSRU
        &q=${source}&zoom=18`}></iframe>
            </div>
        </div>
    );
};