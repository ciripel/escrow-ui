<template>
  <div class="container mt-3 mt-sm-5">
    <div>
      <div class="form-group">
          <label for="2020-12-24-programId-escrow-alice">Throwaway private key (as byte array from sollet.io, without the '[]')</label>
          <input class="form-control form-control-warning" type="text" v-model="formState.privateKey">
        </div>
        <div class="form-group">
          <label for="2020-12-24-programId-escrow-alice">Program id</label>
          <input class="form-control form-control-warning" type="text" id="2020-12-24-programId-escrow-alice" v-model="formState.programId">
        </div>
        <div class="form-group">
          <label for="">Bob's X token account pubkey</label>
          <input class="form-control form-control-warning" type="text" v-model="formState.takerXAccAddress">
        </div>
        <div class="form-group">
          <label for="">Bob's Y token account pubkey</label>
          <input class="form-control form-control-warning" type="text" v-model="formState.takerYAccAddress">
        </div>
        <div class="form-group">
          <label for="">Escrow account pubkey</label>
          <input class="form-control form-control-warning" type="text" v-model="formState.escrowAccAddress">
        </div>
        <div class="form-group">
          <label for="">Amount X tokens Bob wants</label>
          <input class="form-control form-control-warning" type="number" v-model="formState.XTokenExpectedAmount">
        </div>
        <div class="form-group">
          <input style="margin-right: 5px;" class="btn btn-primary" type="submit" value="Reset UI" @click="resetUI">
          <input class="btn btn-primary" type="submit" value="Take trade" @click="onTakeTrade">
        </div>
    </div>
  </div>
</template>

<script lang="ts"> 
import { defineComponent, reactive } from 'vue';
import { takeTrade } from "./util/takeTrade";

export default defineComponent({
    setup() {
        const formState = reactive({
            privateKey: "5,104,82,45,102,201,133,144,88,105,175,73,131,117,183,255,212,158,148,246,222,8,251,179,25,202,56,63,245,73,210,3,87,84,33,81,80,221,96,222,98,180,29,152,215,153,158,53,132,67,91,188,61,204,161,89,50,196,133,116,19,182,216,24",
            programId: "EWteUw3TUuQniV6pA3c4YjJSo2x6JzMMSfgia7m9gm49",
            takerXAccAddress: "JB6ewV6gPdW5LFS4HKc2cx7MjGms8VopYoU9PEGUerP3",
            takerYAccAddress: "q3bDE1dvtEemrnzMUWc1aTgBRmk4vs9QHNMjZ3WdCR8",
            escrowAccAddress: "",
            XTokenExpectedAmount: 0
        })

        const resetUI = () => {
          formState.privateKey = "5,104,82,45,102,201,133,144,88,105,175,73,131,117,183,255,212,158,148,246,222,8,251,179,25,202,56,63,245,73,210,3,87,84,33,81,80,221,96,222,98,180,29,152,215,153,158,53,132,67,91,188,61,204,161,89,50,196,133,116,19,182,216,24";
          formState.programId = "EWteUw3TUuQniV6pA3c4YjJSo2x6JzMMSfgia7m9gm49";
          formState.takerXAccAddress = "JB6ewV6gPdW5LFS4HKc2cx7MjGms8VopYoU9PEGUerP3",
          formState.takerYAccAddress = "q3bDE1dvtEemrnzMUWc1aTgBRmk4vs9QHNMjZ3WdCR8",
          formState.escrowAccAddress = "",
          formState.XTokenExpectedAmount = 0
        }
        
        const onTakeTrade = async () => {
          try {
            await takeTrade(
              formState.privateKey,
              formState.escrowAccAddress,
              formState.takerXAccAddress,
              formState.takerYAccAddress,
              formState.XTokenExpectedAmount,
              formState.programId
              );
              alert("Success! Alice and Bob have traded their tokens and all temporary accounts have been closed");
          } catch (err) {
            if (err instanceof Error) {
              alert(err.message);
            } else {
              alert("A message-less error occurred");
            }
          }
        }

        return { formState, resetUI, onTakeTrade };
    }
})
</script>
