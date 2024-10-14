import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box, Container, Grid } from '@mui/material';
import svgTemplate from "./svgTemplet";
import { Canvg } from "canvg";

const SVG_WIDTH = 334;
const SVG_HEIGHT = 192;

const App = () => {
  const [cardFields, setCardFields] = useState({
    phoneNumber: "212 555 6342",
    firstName: "Patrick",
    lastName: "Bateman",
    title: "Vice President",
    companyName: "Pierce & Pierce",
    companySubtitle: "Mergers and Acquisitions",
    address: "358 Exchange Place New York, N.Y. 10099 fax 212 555 6390 telex 10 4534",
  });
  const [svg, setSvg] = useState("");

  useEffect(() => {
    syncCardElement();
  }, [cardFields]);

  const syncCardElement = () => {
    const newSvg = svgTemplate(cardFields);
    setSvg(newSvg);
  };

  const updateCard = (event) => {
    const { id, value } = event.target;
    setCardFields(prevFields => ({
      ...prevFields,
      [id]: value,
    }));
  };

  const handleDownload = (format) => {
    if (format === 'svg') {
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      downloadFile(url, 'business-card.svg');
    } else if (format === 'png') {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const scale = 3;
      const v = Canvg.fromString(ctx, svg);
      v.resize(SVG_WIDTH * scale, SVG_HEIGHT * scale);
      v.start();
      const url = canvas.toDataURL("image/png");
      downloadFile(url, 'business-card.png');
    }
  };

  const downloadFile = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mt: 4 }}>
        American Psycho Business Card Generator
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box
                component="img"
                src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`}
                alt="Business Card"
                sx={{ width: '100%', height: 'auto' }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Edit Card Details</Typography>
              {Object.entries(cardFields).map(([key, value]) => (
                <TextField
                  key={key}
                  id={key}
                  label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  value={value}
                  onChange={updateCard}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" onClick={() => handleDownload('svg')}>Download SVG</Button>
        <Button variant="contained" onClick={() => handleDownload('png')}>Download PNG</Button>
        <Button variant="contained" onClick={() => window.print()}>Print</Button>
      </Box>
    </Container>
  );
};

export default App;
