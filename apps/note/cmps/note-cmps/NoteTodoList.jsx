export class NoteTodoList extends React.Component {
     setList = (list) => {
        return list.split(",").map((sentence, index) => {
          return (
            <li
              key={index}
              className="list-todos cursor-pointer"
              onClick={this.lineThrough}
            >
              {sentence}
            </li>
          );
        });
      };
       lineThrough = (ev) => {
        ev.target.classList.toggle("line-through");
      };
      render(){
         
        return (
            <div>
               <ul>{this.setList(this.props.note.info.list)}</ul>
            </div>
          );
      }
   
  }
  