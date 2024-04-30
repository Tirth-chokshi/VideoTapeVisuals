import React from "react";
import svgTemplate from "./svgTemplate";
import { Canvg } from "canvg";

const SVG_WIDTH = 334;
const SVG_HEIGHT = 192;

class BusinessCardGenerator extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     cardFields: {
       phoneNumber: "212 555 6342",
       firstName: "Patrick",
       lastName: "Bateman",
       title: "Vice President",
       companyName: "Pierce & Pierce",
       companySubtitle: "Mergers and Aquisitions",
       address: "358 Exchange Place New York, N.Y. 10099 fax 212 555 6390 telex 10 4534",
     },
     svg: "",
   };
 }

 componentDidMount() {
   this.syncCardElement();
 }

 pngDownloadLinkHandler = () => {
   const canvas = document.createElement("canvas");
   const ctx = canvas.getContext("2d");
   const scale = 3;
   const v = Canvg.fromString(ctx, this.state.svg);
   v.resize(SVG_WIDTH * scale, SVG_HEIGHT * scale);
   v.start();
   const pngLinkEl = document.getElementById("png-download");
   pngLinkEl.href = canvas.toDataURL("image/png");
 };

 svgDownloadLinkHandler = () => {
   const blob = new Blob([this.state.svg], { type: "image/svg+xml" });
   const svgLinkEl = document.getElementById("svg-download");
   svgLinkEl.href = URL.createObjectURL(blob);
 };

 syncCardElement = () => {
   const { cardFields } = this.state;
   const svg = svgTemplate(cardFields);
   this.setState({ svg });
 };

 updateCard = (ev) => {
   const { id, value } = ev.target;
   this.setState((prevState) => ({
     cardFields: {
       ...prevState.cardFields,
       [id]: value,
     },
   }), this.syncCardElement);
 };

 render() {
   const { cardFields } = this.state;

   return (
     <div>
       <h1>Business Card Generator</h1>
       <div className="card" id="card-container">
         <img id="card-image" src={`data:image/svg+xml;charset=utf-8,${this.state.svg}`} alt="Business Card" />
       </div>
       <form className="card-editor">
         <div className="card-editor__field">
           <label htmlFor="firstName">First Name</label>
           <input type="text" id="firstName" name="firstName" value={cardFields.firstName} onChange={this.updateCard} />
           <label htmlFor="lastName">Last Name</label>
           <input type="text" id="lastName" name="lastName" value={cardFields.firstName} onChange={this.updateCard} />
           <label htmlFor="title">Title</label>
           <input type="text" id="title" name="title" value={cardFields.firstName} onChange={this.updateCard} />
           <label htmlFor="companyName">Title</label>
           <input type="text" id="companyName" name="companyName" value={cardFields.firstName} onChange={this.updateCard} />
         </div>
         {/* Add other input fields here */}
       </form>
       <fieldset className="card-save">
         <legend>Export</legend>
         <div className="card-save__buttons">
           <a download="business-card.svg" className="button" type="button" id="svg-download" onClick={this.svgDownloadLinkHandler}>svg</a>
           <a download="business-card.png" className="button" type="button" id="png-download" onClick={this.pngDownloadLinkHandler}>png</a>
           <input type="button" value="print" className="button" onClick={() => window.print()} />
         </div>
       </fieldset>
     </div>
   );
 }
}

export default BusinessCardGenerator;
