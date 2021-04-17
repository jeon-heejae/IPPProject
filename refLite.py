from datetime import *
import speech_recognition as sr   
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import csv
import matplotlib.pyplot as plt

def writeToTextFile(y, d, mth, hr, minu):
    
    f = open("forGraph.txt" , mode="a" , encoding="utf-8")
    y = round(y*100 , 3)
    stamp = d + mth + "@" + hr + minu
    f.write(str(y)+","+stamp+"\n")
            
    f.close()
    return "Recorded in the text file!"
    
def speechrecog(x):
    if ((".wav" in x) or ("\" in x")):
        AF = x
    else:
        AF = x + ".wav" 
    
    r = sr.Recognizer()    
    with sr.AudioFile(AF) as src: 
       audio = r.record(src) 
    
    print("Converting")
    global S
    S = r.recognize_google(audio) 
    global Day, Month, Hour, Minute
    Day =  str(datetime.now().day) 
    Month = str(datetime.now().month)
    Hour = str(datetime.now().hour)
    Minute = str(datetime.now().minute)
    
    try:
        file = "E_for_" + Day + Month + "_at" + Hour + Minute 
        f = open(file + ".txt", "w") 
        f.write(S)
        f.close()
        return "Done!"
    except sr.UnknownValueError:
        return "ME NO KNOW WUT YOU SAY"
    except sr.RequestError:
        return "SYSTEM DOWN, SOWIE"
    
def sentimentAnalysis(data):
    nltk.downloader.download('vader_lexicon')
    sia = SentimentIntensityAnalyzer()
    ss = sia.polarity_scores(data)
    print("------------------------------------------------------------------")
    print("SENTENCE:" , data)
    print("------------------------------------------------------------------")
        
    print(ss['compound'])
    
    writeToTextFile(ss['compound'] , Day , Month , Hour , Minute)
    
def plotGraph():
    
    compounds = []
    when = []
       
    with open('forGraph.txt', mode='r') as csvFile:
        csvReader = csv.DictReader(csvFile)
        n = 0
        for row in csvReader:
            if n == 0:
                print(f'Storing data as - {", ".join(row)}')
                
            print(f'\tFeeling {row["compound"]} at {row["stamp"]}')
            compounds.append(row["compound"])
            when.append(row["stamp"])
            
            n += 1
        print(f'Processed {n} enteries.')
        
    compounds = [float(x) for x in compounds]
    when = [x[(x.index('@')+1):] for x in when]
    plt.plot(when, compounds , 'blue')
    plt.show()
        
        

if __name__ == "__main__":
    fileName = input("Enter the name/entire location of the .wav file - ")
    print(speechrecog(fileName))
    sentimentAnalysis(S)
    plotGraph()

