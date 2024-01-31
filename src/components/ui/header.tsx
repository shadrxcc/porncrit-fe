import ButtonComponent from "../shared/button.component"

const Header = () => {
  return (
    <nav className="flex pt-5 border-b border-mauve-30 justify-between items-center pb-6 px-9">
      <div className="flex gap-x-12 items-center">
        <img src="/logo.png" width={100} className="" alt="" />
        <div className="flex items-center text-sm gap-x-8">
          <p>Home</p>
          <p>Reviews</p>
          <p>Lists</p>
          <p>Fans</p>
        </div>
      </div>

      <div className="flex gap-x-[22px]">
        <ButtonComponent variant="secondary" className="rounded-primary">Log in</ButtonComponent>
        <ButtonComponent variant="pink" className="rounded-primary">Sign up</ButtonComponent>
      </div>
    </nav>
  )
}

export default Header
