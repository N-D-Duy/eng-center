export const Button = ({ lable, onClick }) => {
    return (
        <div class="text-center">
            {
                (lable === "Cancel" || lable === "Delete" || lable === "Leave Course") ? (
                    <button type="submit" class="btn btn-danger" onClick={onClick}>{lable}</button>
                ) : (
                    <button type="submit" class="btn btn-primary" onClick={onClick}>{lable}</button>
                )
            }
        </div>
    )
}