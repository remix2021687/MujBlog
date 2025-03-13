import { BlogBox } from "../Layout/BlogBox/BlogBox"
import examplePhoto from '../../assets/img/examplePhoto.jpg'

export const HomePage = () => {
    return (
        <section className="HomePage">
            <BlogBox 
                    name={"Test"}
                    image={examplePhoto}
                    display_description={
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis laoreet metus. Ut dignissim ac lectus ac efficitur. Etiam non porttitor justo. Vivamus viverra turpis non lorem finibus sagittis. Ut scelerisque Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis laoreet metus. Ut dignissim ac lectus ac efficitur. Etiam non porttitor justo. Vivamus viverra turpis non lorem finibus sagittis. Ut scelerisqueLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis laoreet metus. Ut dignissim ac lectus ac efficitur. Etiam non porttitor justo. Vivamus viverra turpis non lorem finibus sagittis. Ut scelerisque"
                    }
                />
        </section>
    )
}