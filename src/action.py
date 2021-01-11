#from hanabi_lib import Move, MoveType, Color
import json
import time
import os.path

def convertAction(playeraction):

    #update save_path to your folder which stores actions 
    #files = []
    #states_path = '/Users/macbookpro/pytorch/Final_Hanabi/SpartaIntegration/states'

    actions_path = '/Users/macbookpro/pytorch/Final_Hanabi/SpartaIntegration/actions'

    #state = None

    while True:
        found = False
        action_dir = os.listdir(actions_path) 
        for s in action_dir:
            if "botaction" in s.lower():
                found = True
                print("found action")
                #print(s)
                in_file = actions_path + os.path.sep + s
                out_file = actions_path + os.path.sep + "playeraction.txt"
                os.remove(in_file)
                #with open(in_file) as j:
                    #action = json.load(j)
                file = open(out_file, "w")
                file.write("%s\n" %(playeraction))
                print("wrote player action")
                file.close()
                #print("removing file " + in_file)
                #os.remove(in_file)
                #print("removing file " + out_file)
                #os.remove(out_file)
                time.sleep(1)
                return playeraction
            if not found:
                out_file = actions_path + os.path.sep + "playeraction.txt"
                file = open(out_file, "w")
                file.write("%s\n" %(playeraction))
                print("wrote player action")
                file.close()
                time.sleep(1)
                return playeraction