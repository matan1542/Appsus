export class LongText extends React.Component {

    render() {

        return (
            <div>
                {this.props.txt}
                {/* {txt.length > 100 && (
              <button onClick={toggleReadMore}>
                {isReadMore ? "Show Less" : "Show More"}
              </button>
            )} */}
            </div>
        );
    }
}

// { txt, isReadMore, toggleReadMore }