import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

const AnimalMaster = () => {
  const [animals, setAnimals] = useState([]);
  const [animalName, setAnimalName] = useState("");
  const [breedInputs, setBreedInputs] = useState({});

  // Add Animal
  const handleAddAnimal = () => {
    if (!animalName.trim()) return;

    setAnimals([
      ...animals,
      { id: Date.now(), name: animalName, breeds: [] }
    ]);
    setAnimalName("");
  };

  // Add Breed
  const handleAddBreed = (animalId) => {
    const breedName = breedInputs[animalId];
    if (!breedName?.trim()) return;

    setAnimals((prev) =>
      prev.map((animal) =>
        animal.id === animalId
          ? {
              ...animal,
              breeds: [...animal.breeds, { id: Date.now(), name: breedName }]
            }
          : animal
      )
    );

    setBreedInputs({ ...breedInputs, [animalId]: "" });
  };

  // Delete Animal
  const handleDeleteAnimal = (animalId) => {
    setAnimals(animals.filter((a) => a.id !== animalId));
  };

  // Delete Breed
  const handleDeleteBreed = (animalId, breedId) => {
    setAnimals((prev) =>
      prev.map((animal) =>
        animal.id === animalId
          ? {
              ...animal,
              breeds: animal.breeds.filter((b) => b.id !== breedId)
            }
          : animal
      )
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Animal Master Data Configuration
      </Typography>

      {/* Add Animal */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Animal Name (Dog, Cat...)"
          value={animalName}
          onChange={(e) => setAnimalName(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddAnimal}>
          Add pet
        </Button>
      </Box>

      {/* Animal List */}
      {animals.map((animal) => (
        <Accordion key={animal.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ flexGrow: 1 }}>{animal.name}</Typography>
            <IconButton onClick={() => handleDeleteAnimal(animal.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </AccordionSummary>

          <AccordionDetails>
            {/* Add Breed */}
            <Box display="flex" gap={2} mb={2}>
              <TextField
                label="Breed Name"
                value={breedInputs[animal.id] || ""}
                onChange={(e) =>
                  setBreedInputs({
                    ...breedInputs,
                    [animal.id]: e.target.value
                  })
                }
              />
              <Button
                variant="outlined"
                onClick={() => handleAddBreed(animal.id)}
              >
                Add Breed
              </Button>
            </Box>

            {/* Breed List */}
            <List>
              {animal.breeds.map((breed) => (
                <ListItem
                  key={breed.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() =>
                        handleDeleteBreed(animal.id, breed.id)
                      }
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText primary={breed.name} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AnimalMaster;