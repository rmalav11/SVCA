import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar(props){
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">{props.siteName}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href=".">Link</a>
                    </li>
                    <li className="nav-item dropdown">
                    </li>
                    <li className="nav-item">
                    <a className="nav-link disabled" href="." tabIndex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
                <div className="d-flex dropdown">    
                    <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {props.username}
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="/admin/profile">View profile</a></li>
                        
                        <li><hr class="dropdown-divider"></hr></li>
                        <li><a class="dropdown-item" href="/logout/">Log out</a></li>
                    </ul>
                </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;