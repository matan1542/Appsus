import { noteService } from "../../services/note.service.js";
import { utilService } from "../../../../services/util-service.js";
import {Iframe} from "./IFrame.jsx"

export class MapRender extends React.Component {
  state = {
    map: {},
  };

  myRef = React.createRef();
  render() {
    return (
      <div>
        <Iframe source={this.props.note.info.map}/>
    </div>
    );
  }
}



