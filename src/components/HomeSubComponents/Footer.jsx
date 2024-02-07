import "./style/Footer.css"
import logo1 from "../Assets/img/Social/facebook.png"
const Footer = () => {
  return (
    <div>
    <div className="Social">
            <h2 ><strong>Social Conectivity </strong></h2>
        <hr />
                    <div >
                    <a href="#">  <img src={logo1}/> </a>
                     <a href="#"> <img src="assets/img/Social/google-plus.png" alt="" /></a>
                     <a href="#"> <img src="assets/img/Social/twitter.png" alt="" /></a>
                    </div>
                    </div>
        <div id="footer">
          &copy 2014 yourdomain.com | All Rights Reserved |
        </div>

    </div>
  )
}

export default Footer
