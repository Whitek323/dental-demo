import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, CardContent, Avatar, TextField, Button, Typography } from '@mui/material';
import profile_default from '../assets/img/profile-default.jpg';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSave = () => {
    console.log('Saved info:', this.state);
  };

  render() {
    const { name, email } = this.state;

    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card sx={{ padding: 2, boxShadow: 3 }}>
              <CardContent>
                <div className="text-center mb-4">
                  <Avatar
                    alt="Profile"
                    src={profile_default}
                    sx={{ width: 100, height: 100, margin: '0 auto' }}
                  />
                  <Typography variant="h5" className="mt-2">
                    Account Settings
                  </Typography>
                </div>
                <form>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                  <div className="text-end mt-4">
                    <Button variant="contained" color="primary" onClick={this.handleSave}>
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
