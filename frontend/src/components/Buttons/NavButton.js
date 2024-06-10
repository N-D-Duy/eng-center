export const NavButton = ({value, target, active}) => {
    const activeStatus = active ? "nav-link active" : "nav-link";
    return ( <div>
        <button class = {activeStatus} data-bs-toggle="tab" data-bs-target= {target}>prop.value</button>
    </div>)
}