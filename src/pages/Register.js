import {useState, useEffect} from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error1, setError1] = useState(true);
    const [error2, setError2] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [willRedirect, setWillRedirect] = useState(false);

    useEffect(() => {

        if ((email !== '' && password1 !== '' && password2 !== '') && (password1 === password2)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [email, password1, password2]);

    useEffect(() => {

        if (email === '' || password1 === '' || password2 === '') {
            setError1(true);
            setError2(false);
            setIsActive(false);
        } else if ((email !== '' && password1 !== '' && password2 !== '') && (password1 !== password2)) {
            setError1(false);
            setError2(true);
            setIsActive(false);
        } else if((email !== '' && password1 !== '' && password2 !== '') && (password1 === password2)) {
            setError1(false);
            setError2(false);
            setIsActive(true);
        }

    }, [email, password1, password2]);

    const registerUser = (e) => {

        e.preventDefault();

        fetch(`${ process.env.REACT_APP_API_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password1
            })
        })
        .then(res => res.json())
        .then(data => {

            if (data.message === "Registered Successfully") {
        
                Swal.fire({
                    title: 'Registration successful!',
                    icon: 'success',
                    text: 'You may now log in.'
                  });
                setWillRedirect(true);
            } else {
                Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error',
                    text: 'Please check your details and try again.',
                  });
                setFirstName("");
                setLastName("");
                setEmail("");
                setMobileNo("");
                setPassword1("");
                setPassword2("");
            }
        })
    }

    return(
        willRedirect === true ?
                <Redirect to={{pathname: '/login', state: { from: 'register'}}}/>
            :
                <Row 
                    className="justify-content-center bg-light" 
                    style={{ 
                        backgroundImage: 'url("https://i.ytimg.com/vi/jPNgoDkgYX4/maxresdefault.jpg")', 
                        backgroundSize: 'cover', 
                        backgroundRepeat: 'no-repeat', 
                        minHeight: '100vh', 
                        paddingTop: '50px', 
                        position: 'relative' 
                    }}
                >
                    <div 
                        style={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            width: '100%', 
                            height: '100%', 
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                            zIndex: -1 
                        }}
                    ></div>
                    <Col xs={12} md={8} lg={6}>
                        <h2 className="text-center my-4 text-primary fw-bold">Register</h2>
                        <Card className="shadow-lg" style={{ width: '100%' }}>
                            <Form onSubmit={e => registerUser(e)}>
                                <Card.Body style={{ backgroundColor: '#ffffff' }}>

                                    <Form.Group controlId="firstName">
                                        <Form.Label className="text-primary">First Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your First Name"
                                            value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="lastName">
                                        <Form.Label className="text-primary">Last Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your Last Name"
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="userEmail">
                                        <Form.Label className="text-primary">Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="mobileNo">
                                        <Form.Label className="text-primary">Mobile Number:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your 11 digit mobile number"
                                            value={mobileNo}
                                            onChange={e => setMobileNo(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="password1">
                                        <Form.Label className="text-primary">Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password1}
                                            onChange={e => setPassword1(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="password2">
                                        <Form.Label className="text-primary">Verify Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Verify your password"
                                            value={password2}
                                            onChange={e => setPassword2(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                </Card.Body>
                                <Card.Footer style={{ backgroundColor: '#e6f7ff' }}>
                                    {isActive === true ? 
                                            <Button 
                                                variant="primary"
                                                type="submit"
                                                block
                                            >
                                                Register
                                            </Button>
                                        : 
                                            error1 === true || error2 === true ? 
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    disabled
                                                    block
                                                >
                                                    Please enter your registration details
                                                </Button>
                                            : 
                                                <Button
                                                    variant="danger"
                                                    type="submit"
                                                    disabled
                                                    block
                                                >
                                                    Passwords must match
                                                </Button>
                                    }
                                </Card.Footer>
                            </Form>
                        </Card>
                        <p className="text-center mt-3">
                            <span className="px-2 py-1 rounded" style={{ backgroundColor: '#fff3cd', color: '#856404', fontWeight: 'bold' }}>
                                Already have an account?{' '}
                                <Link to={{pathname: '/login', state: { from: 'register'}}} className="text-primary" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
                                    Click here
                                </Link> to log in.
                            </span>
                        </p>
                    </Col>
                </Row>
    );

}
