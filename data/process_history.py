import pandas as pd
import json
import numpy as np

# Load the JSON data from 'data.json'
with open('actual_history.json', 'r') as file:
    data = json.load(file)

# Prepare for JSON serialization
json_ready_data = {}

# Specify start and end dates
start_date = '2023-01-01'
end_date = '2024-03-19'

for key, series in data.items():
    if 'dates' not in series:
        continue
    # Extract dates and values
    dates = series['dates']
    values = series['values']
    
    # Create a DataFrame
    df = pd.DataFrame({
        'Date': pd.to_datetime(dates),
        'Value': values
    })
    
    # Set the date as the index
    df.set_index('Date', inplace=True)
    
    # Ensure the dataset starts from start_date and extends to end_date
    if df.index[0] > pd.to_datetime(start_date):
        df = pd.concat([
            pd.DataFrame({'Value': df.iloc[0]['Value']}, index=[pd.to_datetime(start_date)]),
            df
        ])
    if df.index[-1] < pd.to_datetime(end_date):
        df = pd.concat([
            df,
            pd.DataFrame({'Value': df.iloc[-1]['Value']}, index=[pd.to_datetime(end_date)])
        ])
    
    # Resample to daily frequency, filling missing values with NaN
    df = df.resample('D').asfreq()
    
    # Linearly interpolate the missing values
    df = df.interpolate(method='linear')
    
     # Corrected part: Ensure 'Date' column exists after resetting the index
    df_reset = df.reset_index().rename(columns={'index': 'Date'})
    
    # Convert NaN values to None for JSON compatibility
    df_reset = df_reset.where(pd.notnull(df_reset), None)
    
    # Convert the DataFrame to a dictionary
    data_dict = {
        'dates': df_reset['Date'].dt.strftime('%Y-%m-%d').tolist(),
        'values': df_reset['Value'].tolist()
    }
    json_ready_data[key] = data_dict

# Save the adjusted and interpolated data to 'data2.json'
with open('history.json', 'w') as file:
    json.dump(json_ready_data, file, indent=2)

