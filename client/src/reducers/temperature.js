// Default temperature to use Fahrenheit (imperial, °F)
const temperature = (state = "imperial", action) => {
    switch (action.type) {
        case "SAVE_TEMPERATURE":
            return action.payload;
        case "CONVERT_TEMPERATURE":
            // Assuming action.payload contains the temperature to convert
            if (state === "imperial") {
                // Convert Fahrenheit to Celsius
                return (action.payload - 32) * 5 / 9;
            } else {
                // Convert Celsius to Fahrenheit
                return action.payload * 9 / 5 + 32;
            }
        default:
            return state;
    }
};

export default temperature;
