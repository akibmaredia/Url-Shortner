import React from 'react';
import {Button, Form, FormControl, InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class UrlForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            slug: '',
            create: '',
        };
        this.handleChangeUrl = this.handleChangeUrl.bind(this);
        this.handleChangeSlug = this.handleChangeSlug.bind(this);   
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(event) {
        event.preventDefault();
        var response = await fetch('/url', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                url: this.state.url,
                slug: this.state.slug,
            })
        });
        this.state.create = await response.json();
    }

    handleChangeUrl(event) {
        this.setState({url: event.target.value});
    }

    handleChangeSlug(event) {
        this.setState({slug: event.target.value});
    }

    render() {
        return(
            <>
                <div className="headerShortner">
                    <h1>
                        Short Urls for more efficiency
                    </h1>
                </div>
                <div className="urlForm">
                    <Form inline onSubmit={this.handleSubmit}>
                        <Form.Label htmlFor="inlineFormInputName2" srOnly>
                            Url shorterning
                        </Form.Label>
                        <Form.Control
                            className="mb-2 mr-sm-2"
                            id="inlineFormInputName2"
                            placeholder="Type or paste your URL"
                            onChange={this.handleChangeUrl}
                        />
                        <Form.Label htmlFor="inlineFormInputGroupUsername2" srOnly>
                            slug
                        </Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <FormControl id="inlineFormInputGroupUsername2" placeholder="Slug" onChange={this.handleChangeSlug}/>
                        </InputGroup>
                        <Button type="submit" className="mb-2">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div className="createdUrl">
                    <h3>{this.state.create}</h3>
                </div>
            </>
        );
    }
}

// const UrlForm = () => {
//     const submitHandler = (url, slug) => await fetch('/url', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//         },
//         body: JSON.stringify({
//             url: url,
//             slug: slug,
//         })
//     })
//     return(
//         <div className="urlForm">
//             <Form inline>
//                 <Form.Label htmlFor="inlineFormInputName2" srOnly>
//                     Typr or paste your URL
//                 </Form.Label>
//                 <Form.Control
//                     className="mb-2 mr-sm-2"
//                     id="inlineFormInputName2"
//                     placeholder="Typr or paste your URL"
//                 />
//                 <Form.Label htmlFor="inlineFormInputGroupUsername2" srOnly>
//                     slug
//                 </Form.Label>
//                 <InputGroup className="mb-2 mr-sm-2">
//                     <FormControl id="inlineFormInputGroupUsername2" placeholder="Slug" />
//                 </InputGroup>
//                 <Button type="submit" onClick={submitHandler} className="mb-2">
//                     Submit
//                 </Button>
//             </Form>
//         </div>
//     );
// }

export default UrlForm;