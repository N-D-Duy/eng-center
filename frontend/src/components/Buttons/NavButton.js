

export const NavButton = ({value, target, active}) => {
    return (<li class="nav-item">
                <button class = {active ? "nav-link active" : "nav-link"} data-bs-toggle="tab" data-bs-target= {target}>{value}</button>
             </li>)
}