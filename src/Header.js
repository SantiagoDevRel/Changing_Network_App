import HeaderStyles from "./Header.module.css"



export default function Header({wallet, network}) {

  return ( 
    <div>
        <div>
            <div className={HeaderStyles.mainn}>
                <div><h2>Welcome to Changing Network App</h2></div>
                <div>{wallet}</div>
                <div>Connected to: {network === "homestead" ? `${"ethereum"}` : `${network}`}</div>
            </div>
        </div>
    </div>
  )
}
