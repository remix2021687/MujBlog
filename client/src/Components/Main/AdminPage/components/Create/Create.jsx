import { Image } from '@phosphor-icons/react'

export const Create = () => {
    return (
        <section className="Create">
            <h1>Create Post</h1>
            <form className="Create_form" onSubmit={(e) => {e.preventDefault()}}>
                <label htmlFor="setPhoto" className="Create_form_photo_label">
                    <button><Image size={22}/>Choose Photo</button>
                    
                    <input id="setPhoto" type="file" name="file" hidden />
                </label>
                <section>
                    <input type="text" name="name" placeholder="Name*" />
                    <span></span>
                </section>
                <section>
                    <input type="text" name="name" placeholder="Display description*" />
                    <span></span>
                </section>
                <section>
                    <textarea name="text" placeholder="Text*"></textarea>
                </section>
                <button>Create</button>
            </form>
        </section>
    )
}