


 export function ColorLine({changeColorProfile,changeColorLine}) {
   
  const setColorProfile = (ev)=>{
        changeColorProfile(ev.target.value)
        changeColorLine();
    }
   
        return(
            <section>
                <div className="color-line">
                    <button className="color-btn pink" value='pink' onClick={setColorProfile}></button>
                    <button className="color-btn light-orange" value='light-orange' onClick={setColorProfile}></button>
                    <button className="color-btn light-yellow" value='light-yellow' onClick={setColorProfile}></button>
                    <button className="color-btn light-green" value='light-green' onClick={setColorProfile}></button>
                    <button className="color-btn indigo" value='indigo' onClick={setColorProfile}></button>
                    <button className="color-btn light-blue" value='light-blue' onClick={setColorProfile}></button>
                    <button className="color-btn blue" value='blue' onClick={setColorProfile}></button>
                    <button className="color-btn light-purple" value='light-purple' onClick={setColorProfile}></button>
                </div>
            </section>
        )
 
}