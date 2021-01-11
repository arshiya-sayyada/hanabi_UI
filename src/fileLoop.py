#TODO :
#create a global FILES variable that contains the location of current state and action files
#check folder SpartaIntegration for new files and when relevant file is found do:
    #1) copy file onto data folder here and change it's name to say .json 
    #2) update FILES location
    #3) change the state and action reading require line to take FILES value instead
import json
import time
import os.path

states_path = '/Users/macbookpro/pytorch/Final_Hanabi/SpartaIntegration/states'
actions_path = '/Users/macbookpro/pytorch/Final_Hanabi/SpartaIntegration/actions'
data_storage_path = '/Users/macbookpro/pytorch/Final_Hanabi/SPARTA_UI/just_UI/hanabi_ui/src/data'
#print(action_type)

while True:
        found = False
        state_dir = os.listdir(states_path) 
        #print("in while loop")
        for s in state_dir:
            if "state" in s.lower():
                print(s)
                found = True
                print("found state")
                #print(s)
                in_file = states_path + os.path.sep + s
                out_file = data_storage_path + os.path.sep + "state.json"
                #print(in_file)
                #os.remove(in_file)
                with open(in_file) as j:
                    temp = json.load(j)
                    state = json.dumps(temp)
                file = open(out_file, "w")
                file.write("%s\n" %(state))
                print("wrote state")
                file.close()
                print("removing file " + in_file)
                os.remove(in_file)
                #print("removing file " + out_file)
                #os.remove(out_file)
                time.sleep(1)
                print("state operation done. waiting for player action")
                break

            