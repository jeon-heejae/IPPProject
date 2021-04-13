from tkinter import *
root = Tk()
root.wm_attributes('-type', 'splash')
root.title("CAR")
root.geometry("1920x1080")
#root.wm_iconbitmap('iconDaalo')
#f = Frame(root, height = 1080 , width = 1260 , bg = "black" , cursor = "cross").pack()
bgImage = PhotoImage(file = "C:\\Users\\10aru\\Downloads\\as.gif")
#button1 = Button(root , text = "click me").pack()
c = Canvas(root , bg = "white", height = 1080 , width = 1920)
c.create_image(2, 2, image = bgImage, anchor = "center")
c.pack()


root.mainloop()
